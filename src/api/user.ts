import axios from '@/utils/axios'
import type { IResponse } from '@/types/response'

// generateReferCode
export const generateReferCode = (params: any): Promise<IResponse> =>
  axios.post('/user/generateReferCode', { data: params })

// statistic
export const statistic = (params: any): Promise<IResponse> =>
  axios.post('/user/share/statistic', { data: params })
