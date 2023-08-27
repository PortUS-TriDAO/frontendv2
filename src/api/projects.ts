import axios from '../utils/axios'
import { type IResponse } from '@/types/response'
// 提交创建游戏
export const createProject = (params: any): Promise<IResponse> =>
  axios.post('/project/create', { data: params })
// 请求游戏列表
export const queryAllProjects = (params: any): Promise<IResponse> =>
  axios.get('/project/all', { params })
// 获取游戏详情
export const getProjectDetail = (params: any): Promise<IResponse> =>
  axios.get('/project/detail', { params })

// 获取我的推广列表
export const getMyDistributionProjects = (params: any) =>
  axios.get('/mine/distributions', { params })
