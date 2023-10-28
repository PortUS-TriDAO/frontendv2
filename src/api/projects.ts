import type {
  BusinessDetailData,
  IListResponse,
  IResponse,
  ProjectData,
  ProjectDetailData,
} from '@/types';

import axios from '../utils/axios';
// 提交创建游戏step1
export const createProjectStep1 = (params: {
  projectName: string;
  briefIntro: string;
  website: string;
  description: string;
  avatar: string;
  cover: string;
  creatorAddress: string;
}): Promise<IResponse> => axios.post('/project/create/step1', params);
// 提交创建游戏step2
export const createProjectStep2 = (params: {
  projectId: string;
  contractName: string;
  sharePercentage: string | number;
  briefIntro: string;
  payToken: string;
  description: string;
  rightQuantity: string | number;
  businessContractAddress: string;
}): Promise<IResponse> => axios.post('/project/create/step2', params);

// 请求游戏列表
export const getProjects = (params: {}): Promise<IListResponse<ProjectData>> =>
  axios.get('/project/all', { params });
// 获取游戏详情
export const getProjectDetail = (params: {
  projectId: string;
}): Promise<IResponse<ProjectDetailData>> => axios.get('/project/detail', { params });

export const getBusinessDetail = (params: {
  businessId: string;
}): Promise<IResponse<BusinessDetailData>> => axios.get('/project/business/detail', { params });

export const postDeployedContract = (params: {
  nftAddress: string;
  nftType: 1 | 2; // 1: minted nft 2: unminted nft
  contractAddress: string;
}) => axios.post('/project/contract/deploy', params);

// 提交项目已经mint过
export const postProjectMint = (params: {
  projectId: string;
  account: string;
}): Promise<IResponse> => axios.post('/project/mint', params);

// 查询SKU和SPU 列表
export const getSkuList = (params: { id: string }): Promise<IListResponse> =>
  axios.get('/project/skulist', { params });

// // 查询sku详情
// export const getSkuDetail = (params: { tokenId: string }): Promise<IResponse> =>
//   axios.get('/sku/detail', { params });

// 上架SKU
export const publishSku = (params: {
  projectId: string;
  tokenId: number;
  price: bigint;
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
