import { splitSignature } from '@ethersproject/bytes';
import { type Address, getAccount, waitForTransaction, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import RETAILER_ABI from '@/abi/retailer.abi.json';
import * as projectApi from '@/api/projects';
import { postTicketInfo } from '@/api/ticket';
import { useDeployerContractStore } from '@/stores/useDeployerContract';
import { useERC20Contract } from '@/stores/useERC20Contract';
import { useRouterContract } from '@/stores/useRouterContract';
import { useSignTypedDataStore } from '@/stores/useSignTypedData';
import { isProd } from '@/utils';
import { extendsDecimals, toBN } from '@/utils/bn';

import { useFundsContract } from './useFundsContract';
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
  payPrice: string;
  sellAmount: number;
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
      projectId,
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
      extendsDecimals(sharePercentage).div(100).toString(),
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
    nftType: number, // 721 or 1155 type
  ) {
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createMintedRetailer(
      bizContract,
      nftAddress,
      nftType,
    );
    const { success, data } = await projectApi.postRetailCreate({
      projectId,
      bizId: Number(bizId),
      retailAddress: contractAddress,
      nftAddress,
      nftType: 1,
      retailType: 1,
      avatar: '',
    });

    return { success, data, contractAddress };
  }

  async function deployUnmintedNftContract(
    projectId: string,
    nftAddress: string,
    bizContract: string,
    bizId: string,
    nftType: 0 | 1,
  ) {
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createUnmintedRetailer(
      bizContract,
      nftAddress,
      nftType,
    );
    const { success, data } = await projectApi.postRetailCreate({
      projectId,
      bizId: Number(bizId),
      retailAddress: contractAddress,
      nftAddress,
      nftType,
      retailType: 2,
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
    sellAmount,
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
    sellAmount: number;
  }) {
    // approve NFT
    const nftContract = useNftContract();

    // 检查是否已经approve过了
    const hasApproved = await nftContract.isApprovedForAll(nftAddress, retailerAddress);
    if (!hasApproved) {
      const approveTx = await nftContract.setApprovalForAll(nftAddress, retailerAddress, true);
      await waitForTransaction({ hash: approveTx.hash });
    }

    // const { payToken } = data;
    const signTypedDataStore = useSignTypedDataStore();
    const extendsPrice = isProd()
      ? toBN(price).multipliedBy(1e6).toString(10)
      : toBN(price).multipliedBy(1e18).toString(10);
    const signature = await signTypedDataStore.signMintedNftRetailer(
      payToken,
      extendsPrice,
      nftTokenId,
      deadline,
      retailerAddress,
      sellAmount,
    );
    const { address: seller } = getAccount();

    // TODO: get nft metadata
    let metadata = {};
    try {
      const tokenURI = await nftContract.tokenURI(nftAddress, nftTokenId);
      metadata = await fetch(tokenURI).then((r) => r.json());
    } catch (err) {}

    return projectApi.publishSku({
      projectId: projectId.toString(),
      bizId,
      retailId,
      tokenId: nftTokenId,
      price: price,
      ddl: deadline,
      seller: seller,
      payToken,
      signature,
      sellAmount,
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
    sellAmount,
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
    sellAmount: number;
  }) {
    const signTypedDataStore = useSignTypedDataStore();
    const signature = await signTypedDataStore.signUnmintedNftRetailer(
      payToken,
      price,
      tokenId,
      ddl,
      retailerAddress,
      sellAmount,
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

  // // buy sku
  // async function buyMintedNft(
  //   retailerContract: Address, // business contract
  //   buyNftParams: IBuyInfo[],
  //   kolTokenId: number,
  // ) {
  //   if (buyNftParams.length === 0) throw new Error('Invalid params');
  //   // approve erc20
  //   const { payToken, payPrice, nftTokenId } = buyNftParams[0];
  //   const erc20Contract = useERC20Contract();
  //   const approveTx = await erc20Contract.approve(payToken, retailerContract, payPrice);
  //   await waitForTransaction(approveTx);
  //
  //   const buyParams = buyNftParams.map((item) => {
  //     const { r, s, v } = splitSignature(item.signature);
  //     return [item.seller, item.payToken, item.payPrice, item.nftTokenId, item.deadline, v, r, s];
  //   });
  //
  //   await writeContract({
  //     address: retailerContract,
  //     abi: RETAILER_ABI,
  //     functionName: 'buy',
  //     // [[seller,payToken,payPrice,nftTokenId,deadline,v,r,s]],referralTokenId
  //     args: [buyParams, [1], kolTokenId],
  //   });
  // }

  async function handleBuyMintedNft(
    retailerContract: Address, // business contract
    buyNftParams: IBuyInfo[],
    kolTokenId: number,
  ) {
    const buyParams = buyNftParams.map((item) => {
      const { r, s, v } = splitSignature(item.signature);
      return [
        item.seller,
        item.payToken,
        item.payPrice,
        item.sellAmount,
        item.nftTokenId,
        item.deadline,
        v,
        r,
        s,
      ];
    });

    return writeContract({
      address: retailerContract,
      abi: RETAILER_ABI,
      functionName: 'buy',
      // [[seller,payToken,payPrice,nftTokenId,deadline,v,r,s]],referralTokenId
      args: [buyParams, [1], kolTokenId],
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
    const tokenId = await rightsContract.tokenOfOwnerByIndex(rightsContractAddress, kolAddress);

    // 将mint信息保存到后端
    await projectApi.kolMint({
      projectId,
      bizId,
      kolAddress,
      rightId: Number(tokenId),
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

  async function operatorPendingRewards(projectAddress: Address, token: Address): Promise<bigint> {
    const projectContract = useProjectContract();
    const fundContractAddress = await projectContract.funds(projectAddress);
    const fundsContract = useFundsContract();
    const rewards = await fundsContract.operatorPendingRewards(fundContractAddress, token);
    return rewards as bigint;
  }

  async function referrerPendingReward(projectAddress: Address, token: Address): Promise<bigint> {
    const projectContract = useProjectContract();
    const fundContractAddress = await projectContract.funds(projectAddress);
    const fundsContract = useFundsContract();

    const { address: account } = getAccount();
    const rewards = await fundsContract.referrerPendingReward(fundContractAddress, token, account);
    return rewards as bigint;
  }

  async function handleTickVerify(params: {
    nftAddress: string;
    tokenId: number;
    skuId: number;
    mobile?: string;
    name?: string;
    email?: string;
    industry?: string;
    company?: string;
    jobTitle?: string;
    countryOrRegion?: string;
  }): Promise<{ ticketToken: string }> {
    const { address } = getAccount();
    const {
      nftAddress,
      tokenId,
      skuId,
      mobile,
      name,
      email,
      industry,
      company,
      jobTitle,
      countryOrRegion,
    } = params;
    const { message, signature } = await postTicketInfo();
    // if (returnDesc !== 'Success') throw new Error('get ticket info failed');

    // const { owner, ticketStatus, ticketToken } = data;
    const { data } = await projectApi.postUserByTicket({
      skuId,
      address,
      contractAddress: nftAddress,
      tokenId,
      message,
      signature,
      mobile,
      name,
      email,
      industry,
      company,
      jobTitle,
      countryOrRegion,
    });

    return { ticketToken: data.ticketToken };
  }

  return {
    state,
    createProject,
    deployMintedNftContract,
    deployUnmintedNftContract,
    publishSku,
    publishSpu,
    // buyMintedNft,
    handleBuyMintedNft,
    mint,
    kolWithdraw,
    operatorWithdraw,
    operatorPendingRewards,
    referrerPendingReward,
    handleTickVerify,
  };
});
