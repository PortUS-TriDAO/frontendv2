import type { IListResponse, IResponse, NftContractData, SkuData, SpuData } from '@/types';
import { NftType } from '@/types';
import axios from '@/utils/axios';

// export const getNftDetail = (params: { nftAddress: string }): Promise<IResponse<NftContractData>> =>
//   axios.get('/project/nft/detail', { params });
export const getNftDetail = (params: {
  nftType: NftType;
  id: number;
}): Promise<IResponse<NftContractData>> => axios.get('/mine/retail/detail', { params });

// export const getNftList = (params: {
//   retailId: number;
//   page: number;
//   limit: number;
// }): Promise<IListResponse<SkuData>> => axios.get('/project/nft/list', { params });

// /v2/mine/retailcontracts
export const getRetailContracts = (params: { bizId: string }): Promise<IResponse<SkuData>> =>
  axios.get('/mine/retailcontracts', { params });

// 查询sku详情
export const getSkuDetail = (params: { skuId: number }): Promise<IResponse<SpuData>> =>
  axios.get('/project/spu/detail', { params });

// 查询SPU详情
export const getSpuDetail = (params: { spuId: number }): Promise<IResponse<SpuData[]>> =>
  axios.get('/project/spu/detail', { params });

export const getSkuList = (params: {
  retailId: number;
  page?: number;
  limit?: number;
}): Promise<IListResponse<SkuData>> => axios.get('/project/sku/list', { params });

export const getSpuList = (params: {
  retailId: number;
  page?: number;
  limit?: number;
}): Promise<IListResponse<SpuData>> => axios.get('/project/spu/list', { params });
