import { rest } from 'msw';

import type { Address, ProjectData } from '@/types';
import type { IListResponse, IResponse } from '@/types/response';

import axios from '../utils/axios';
// 获取我的推广列表
export const getMyDistributions = (params: { kolAddress: string }): Promise<IListResponse> =>
  axios.get('/mine/distributions', { params });

// 获取我的games列表
export const getMyGames = (params: { creatorAddress: string }): Promise<IListResponse> =>
  axios.get('/mine/games', { params });

//   获取我的收益
export const getMyProfits = (params: { address: string }): Promise<IResponse> =>
  axios.get('/mine/profits', { params });

//   获取我提交的商业合约列表
export const getMySubmitedList = (params: { address: string }): Promise<IResponse> =>
  axios.get('/mine/submited', { params });

//   获取我参与的商业合约列表
export const getMyParticipatList = (params: { address: string }): Promise<IResponse> =>
  axios.get('/mine/participat', { params });

// 获取我参与的或者创建的商业合约详情
export const getMyBussiness = (params: { address: string; tokenId: string }): Promise<IResponse> =>
  axios.get('/mine/business/detial', { params });

//
// v2
//
export const getSubmittedProjects = (params: {
  creatorAddress: Address;
}): Promise<IListResponse<ProjectData>> => axios.get('/mine/submitted', { params });

export const getParticipateProjects = (params: {
  kolAddress: Address;
}): Promise<IListResponse<ProjectData>> => axios.get('/mine/participat', { params });

// export const getParticipatProjects = (params: {}): Promise<IListResponse<ProjectData>> =>
//   axios.get('/mine/participat', { params });
