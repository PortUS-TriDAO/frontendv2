import type { IListResponse, IResponse } from '@/types/response';

import axios from '../utils/axios';
// 提交创建游戏
export const createProject = (params: {
  name: string;
  icon: string;
  briefIntro: string;
  website: string;
  description: string;
  banner: string;
  token: string;
  symbol: string;
  sharePercentage: string;
  projectAddress: string;
  creatorAddress: string;
  screenShots: string[];
  nftType: 1 | 2; // 1： 已经Mint的NFT  2： 还未mint的NFT
}): Promise<IResponse> => axios.post('/project/create', params);
// 请求游戏列表
export const getProjects = (params: {}): Promise<IResponse> =>
  axios.get('/project/all', { params });
// 获取游戏详情
export const getProjectDetail = (params: { id: string }): Promise<IResponse> =>
  axios.get('/project/detail', { params });

// 提交项目已经mint过
export const postProjectMint = (params: {
  projectId: string;
  account: string;
}): Promise<IResponse> => axios.post('/project/mint', params);

// 查询SKU和SPU 列表
export const getSkuList = (params: { id: string }): Promise<IListResponse> =>
  axios.get('/project/skulist', { params });

// 查询sku详情
export const getSkuDetail = (params: { tokenId: string }): Promise<IResponse> =>
  axios.get('/sku/detail', { params });

// 上架SKU
export const publishSku = (params: {
  projectId: string;
  tokenId: string;
  price: string;
  ddl: number;
  seller: string;
  payToken: string;
  signature: string;
}): Promise<IResponse> => axios.post('/sku/publish', params);

// 上架SPU
export const publishSpu = (params: {
  name: string;
  price: string;
  description: string;
  ddl: number;
  intro: string;
  seller: string;
  payToken: string;
  icon: string;
  banner: string;
  signature: string;
}): Promise<IResponse> => axios.post('/spu/publish', params);
