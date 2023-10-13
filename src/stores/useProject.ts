import { defineStore } from 'pinia';
import { reactive } from 'vue';

import * as projectApi from '@/api/projects';

import { useProjectContract } from './useProjectContract';

export const useProjectStore = defineStore('project', () => {
  const state = reactive({
    total: 1000,
    currentPage: 5,
    projectList: [],
    projectDetail: {},
    skuList: [],
    skuDetail: {},
  });

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

  // 创建项目
  async function createProject(params) {
    const { success, data } = await projectApi.createProject(params);
    if (!success) throw new Error(data);
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
