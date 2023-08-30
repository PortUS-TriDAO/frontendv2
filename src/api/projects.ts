import axios from '../utils/axios'
import type { IResponse, IListResponse } from '@/types/response'
// 提交创建游戏
export const createProject = (params: any): Promise<IResponse> =>
  axios.post('/project/create', params)
// 请求游戏列表
export const queryAllProjects = (params: any): Promise<IResponse> =>
  axios.get('/project/all', { params })
// 获取游戏详情
export const getProjectDetail = (params: any): Promise<IResponse> =>
  axios.get('/project/detail', { params })

// 获取我的推广列表
export const getMyDistributions = (params: any): Promise<IListResponse> =>
  axios.get('/mine/distributions', { params })

// 获取我的games列表
export const getMyGames = (params: any): Promise<IListResponse> =>
  axios.get('/mine/games', { params })

// 提交项目已经mint过
export const postProjectMint = (params: any): Promise<IResponse> =>
  axios.post('/project/mint', params)
