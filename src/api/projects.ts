import type {
  BusinessDetailData,
  IListResponse,
  IResponse,
  PrimaryProjectInfo,
  ProjectData,
  ProjectDetailData,
  RightData,
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
}): Promise<IResponse> => axios.post('/project/create', params);
// 提交创建游戏step2
export const createProjectStep2 = (params: {
  projectId: string;
  contractName: string;
  sharePercentage: string | number;
  briefIntro: string;
  payToken: string;
  description: string;
  rightQuantity: string | number;
  contractAddress: string;
}): Promise<IResponse> => axios.post('/project/biz/create', params);

// 请求游戏列表
export const getProjects = (params: {}): Promise<IListResponse<ProjectData>> =>
  axios.get('/project/all', { params });
// 获取游戏详情
export const getProjectDetail = (params: {
  projectId: string;
}): Promise<IResponse<ProjectDetailData>> => axios.get('/project/detail', { params });

export const getBusinessDetail = (params: {
  bizId: string;
}): Promise<IResponse<BusinessDetailData>> => axios.get('/project/biz/detail', { params });

export const postRetailCreate = (params: {
  projectId: string;
  bizId: number;
  retailAddress: string;
  nftAddress: string;
  nftType: 1 | 2;
  avatar: string;
}): Promise<IResponse> => axios.post('project/retail/create', params);

// 上架SKU
export const publishSku = (params: {
  projectId: string;
  bizId: number;
  retailId: number;
  tokenId: number;
  price: string;
  ddl: number;
  seller: string;
  payToken: string;
  signature: string;
}): Promise<IResponse> => axios.post('/project/sku/publish', params);

// 上架SPU
export const publishSpu = (params: {
  projectId: number;
  bizId: number;
  retailId: number;
  tokenId: number;
  price: string;
  ddl: number;
  seller: string;
  payToken: string;
  briefIntro: string;
  description: string;
  nftQuantity: number;
  avatar: string;
  image: string;
  cover: string;
  signature: string;
}): Promise<IResponse> => axios.post('/project/spu/publish', params);

// KOL mint 完以后通知服务端
export const kolMint = (params: {
  projectId: number;
  bizId: number;
  kolAddress: string;
  rightId: number;
}): Promise<IResponse> => axios.post('/project/kol/mint', params);

export const getkolRightId = (params: {
  bizId: number;
  kolAddress: string;
}): Promise<IResponse<RightData>> => axios.get('/project/kol/rightid', { params });

export const getPrimaryProjectInfo = (): Promise<IResponse<Array<PrimaryProjectInfo>>> =>
  axios.get('/project/primary');
