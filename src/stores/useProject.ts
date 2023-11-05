import { splitSignature } from '@ethersproject/bytes';
import { type Address, getAccount, waitForTransaction, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import RETAILER_ABI from '@/abi/retailer.abi.json';
import * as projectApi from '@/api/projects';
import { useDeployerContractStore } from '@/stores/useDeployerContract';
import { useRouterContract } from '@/stores/useRouterContract';
import { useSignTypedDataStore } from '@/stores/useSignTypedData';
import { toBN } from '@/utils/bn';

import { useNftContract } from './useNftContract';
import { useProjectContract } from './useProjectContract';
import { useRightsContract } from './useRightsContract';

interface ICreateProject {
  projectId: string;
  briefIntro: string;
  description: string;
  contractName: string;
  symbol: string;
  payToken: Address;
  sharePercentage: string | number;
  rightQuantity: number | string;
}

interface IBuyInfo {
  seller: Address;
  payToken: Address;
  payPrice: bigint;
  nftTokenId: number;
  deadline: number;
  signature: string;
}

export const useProjectStore = defineStore('project', () => {
  const state = reactive({
    total: 1000,
    currentPage: 5,
    projectList: [],
    projectDetail: {},
    skuList: [],
    skuDetail: {},
  });

  async function createProject(params: ICreateProject): Promise<{
    projectAddress: string;
    success: boolean;
    data: any;
  }> {
    console.log('createProject', params);
    const {
      projectId: number,
      briefIntro,
      description,
      contractName,
      symbol,
      payToken,
      sharePercentage,
      rightQuantity,
    } = params;
    const routerContract = useRouterContract();
    const tx = await routerContract.createProject(
      contractName,
      symbol,
      payToken,
      sharePercentage,
      rightQuantity,
    );
    await waitForTransaction({ hash: tx.hash });

    const contractAddress: Address = await routerContract.getProjectAddress();

    const { success, data } = await projectApi.createProjectStep2({
      projectId: params.projectId,
      contractName,
      sharePercentage,
      briefIntro,
      payToken,
      description,
      rightQuantity,
      contractAddress: contractAddress,
    });

    return { projectAddress: contractAddress, success, data };
  }

  async function deployMintedNftContract(
    projectId: string,
    nftAddress: string,
    bizContract: string,
    bizId: string,
  ) {
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createMintedRetailer(bizContract, nftAddress);
    const { success, data } = await projectApi.postRetailCreate({
      projectId,
      bizId: Number(bizId),
      retailAddress: contractAddress,
      nftAddress,
      nftType: 1,
      avatar: '',
    });

    return { success, data, contractAddress };
  }

  async function deployUnmintedNftContract(
    projectId: string,
    nftAddress: string,
    bizContract: string,
    bizId: string,
  ) {
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createUnmintedRetailer(bizContract, nftAddress);
    const { success, data } = await projectApi.postRetailCreate({
      projectId,
      bizId: Number(bizId),
      retailAddress: contractAddress,
      nftAddress,
      nftType: 2,
      avatar: '',
    });

    return { success, data, contractAddress };
  }

  async function publishSku({
    projectId,
    price,
    nftTokenId,
    deadline,
    retailerAddress,
    nftAddress,
    payToken,
    bizId,
    retailId,
  }: {
    projectId: number;
    price: string;
    nftTokenId: number;
    deadline: number;
    retailerAddress: Address;
    nftAddress: Address;
    payToken: Address;
    bizId: number;
    retailId: number;
  }) {
    // approve NFT
    const nftContract = useNftContract();
    const approveTx = nftContract.approve(nftAddress, retailerAddress, nftTokenId);
    await waitForTransaction({ hash: approveTx.hash });

    // const { payToken } = data;
    const signTypedDataStore = useSignTypedDataStore();
    const signature = await signTypedDataStore.signMintedNftRetailer(
      payToken,
      toBN(price).multipliedBy(1e18).toString(10),
      nftTokenId,
      deadline,
      retailerAddress,
    );
    const { address: seller } = getAccount();

    return projectApi.publishSku({
      projectId,
      bizId,
      retailId,
      tokenId: nftTokenId,
      price: price,
      ddl: deadline,
      seller: seller,
      payToken,
      signature,
    });
  }

  async function publishSpu({
    retailerAddress,
    nftAddress,
    projectId,
    bizId,
    retailId,
    tokenId,
    price,
    ddl,
    payToken,
    briefIntro,
    description,
    nftQuantity,
    avatar,
    image,
    cover,
  }: {
    retailerAddress: Address;
    nftAddress: Address;
    projectId: number;
    bizId: number;
    retailId: number;
    tokenId: number;
    price: bigint;
    ddl: number;
    payToken: Address;
    briefIntro: string;
    description: string;
    nftQuantity: number;
    avatar: string;
    image: string;
    cover: string;
  }) {
    const signTypedDataStore = useSignTypedDataStore();
    const signature = await signTypedDataStore.signUnmintedNftRetailer(
      payToken,
      price,
      tokenId,
      ddl,
      retailerAddress,
    );

    const { address: seller } = await getAccount();
    return projectApi.publishSpu({
      projectId,
      bizId,
      retailId,
      tokenId,
      price: price.toString(),
      ddl,
      seller,
      payToken,
      briefIntro,
      description,
      nftQuantity,
      avatar,
      image,
      cover,
      signature,
    });
  }

  // buy sku
  async function buyMintedNft(
    retailerContract: Address, // business contract
    buyNftParams: IBuyInfo[],
    kolTokenId: number,
  ) {
    const buyParams = buyNftParams.map((item) => {
      const { r, s, v } = splitSignature(item.signature);
      return [item.seller, item.payToken, item.payPrice, item.nftTokenId, item.deadline, v, r, s];
    });

    await writeContract({
      address: retailerContract,
      abi: RETAILER_ABI,
      functionName: 'buy',
      // [[seller,payToken,payPrice,nftTokenId,deadline,v,r,s]],referralTokenId
      args: [buyParams, kolTokenId],
    });
  }

  async function mint(projectAddress: Address, projectId: number, bizId: number) {
    const projectContract = useProjectContract();
    const tx = await projectContract.referrerSign(projectAddress);
    await waitForTransaction({ hash: tx.hash });

    // 查询tokenID
    const { address: kolAddress } = await getAccount();
    const rightsContract = useRightsContract();
    const rightsContractAddress = (await projectContract.rights(projectAddress)) as Address;
    const tokenId = (await rightsContract.tokenOfOwnerByIndex(
      rightsContractAddress,
      kolAddress,
    )) as number;

    // 将mint信息保存到后端
    await projectApi.kolMint({
      projectId,
      bizId,
      kolAddress,
      rightId: tokenId.toString(),
    });
  }

  async function kolWithdraw(projectAddress: Address) {
    const projectContract = useProjectContract();
    const rightsContract = useRightsContract();
    const { address } = getAccount();
    // 查询tokenID
    const rightsContractAddress = (await projectContract.rights(projectAddress)) as Address;
    const tokenId = (await rightsContract.tokenOfOwnerByIndex(
      rightsContractAddress,
      address,
    )) as number;
    return projectContract.referrerWithdraw(projectAddress, tokenId);
  }

  async function operatorWithdraw(projectAddress: Address) {
    const projectContract = useProjectContract();
    return projectContract.operatorWithdraw(projectAddress);
  }

  return {
    state,
    createProject,
    deployMintedNftContract,
    deployUnmintedNftContract,
    publishSku,
    publishSpu,
    buyMintedNft,
    mint,
    kolWithdraw,
    operatorWithdraw,
  };
});
