import { type Address, getAccount, waitForTransaction } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import * as projectApi from '@/api/projects';
import { useDeployerContractStore } from '@/stores/useDeployerContract';
import { useRouterContract } from '@/stores/useRouterContract';
import { useSignTypedDataStore } from '@/stores/useSignTypedData';

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
      businessContractAddress: contractAddress,
    });

    return { projectAddress: contractAddress, success, data };
  }

  async function deployMintedNftContract(projectId: string, nftContract: string) {
    const { success, data } = await projectApi.getProjectDetail({ projectId });
    if (!success) throw new Error('fetch project details failed');

    const { projectAddress } = data;
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createMintedRetailer(
      projectAddress,
      nftContract,
    );

    const result = await projectApi.postDeployedContract({
      nftAddress: nftContract,
      nftType: 1,
      contractAddress,
    });

    return { ...result, contractAddress };
  }

  async function deployUnmintedNftContract(projectId: string, nftContract: string) {
    const { success, data } = await projectApi.getProjectDetail({ projectId });
    if (!success) throw new Error('fetch project details failed');

    const { projectAddress } = data;
    const deployerContract = useDeployerContractStore();
    // bussinessContractAddress
    const contractAddress = await deployerContract.createUnmintedRetailer(
      projectAddress,
      nftContract,
    );
    const result = await projectApi.postDeployedContract({
      nftAddress: nftContract,
      nftType: 2,
      contractAddress,
    });

    return { ...result, contractAddress };
  }

  async function publishSku(
    projectId: string,
    price: bigint,
    nftTokenId: number,
    deadline: number,
    retailerAddress: Address,
  ) {
    const { success, data } = await projectApi.getProjectDetail({ projectId });
    if (!success) throw new Error(data);

    const { payToken } = data;

    const signTypedDataStore = useSignTypedDataStore();
    const signature = await signTypedDataStore.signMintedNftRetailer(
      payToken,
      price,
      nftTokenId,
      deadline,
      retailerAddress,
    );
  }

  async function publishSpu(
    projectId: string,
    price: bigint,
    nftTokenId: number,
    deadline: number,
    retailerAddress: Address,
  ) {
    const { success, data } = await projectApi.getProjectDetail({ projectId });
    if (!success) throw new Error(data);

    const { payToken } = data;

    const signTypedDataStore = useSignTypedDataStore();
    const signature = await signTypedDataStore.signUnmintedNftRetailer(
      payToken,
      price,
      nftTokenId,
      deadline,
      retailerAddress,
    );

    const { address: seller } = await getAccount();
    return projectApi.publishSku({
      projectId,
      tokenId: nftTokenId,
      price,
      ddl: deadline,
      seller,
      payToken,
      signature,
    });
  }

  return {
    state,
    createProject,
    deployMintedNftContract,
    deployUnmintedNftContract,
    publishSku,
    publishSpu,
  };
});
