import { type Address, waitForTransaction } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import * as projectApi from '@/api/projects';
import { useRouterContract } from '@/stores/useRouterContract';

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

  async function createProject(params: ICreateProject) {
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

    return projectApi.createProjectStep2({
      projectId: params.projectId,
      contractName,
      sharePercentage,
      briefIntro,
      payToken,
      description,
      rightQuantity,
      businessContractAddress: contractAddress,
    });
  }

  // 查询项目列表
  async function getProjects() {
    const { success, data } = await projectApi.getProjects({});
    if (success) {
      const { total, currentPage, rows } = data;
      state.total = total;
      state.currentPage = currentPage;
      state.projectList = rows;
    } else {
      throw new Error(data);
    }
  }

  async function getProjectDetail(params) {
    const { success, data } = await projectApi.getProjectDetail(params);
    if (!success) throw new Error(data);
    state.projectDetail = data;
  }

  async function getSkuList(id: string) {
    const { success, data } = await projectApi.getSkuList({ id });
    if (!success) throw new Error('request failed');
    state.skuList = data.rows;
  }

  async function getSkuDetail(tokenId: string) {
    const { success, data } = await projectApi.getSkuDetail({ tokenId });
    if (!success) throw new Error(data);
    state.skuDetail = data;
  }

  return { state, getProjects, createProject, getProjectDetail, getSkuDetail, getSkuList };
});
