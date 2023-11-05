import type { IListResponse, IResponse, NftContractData, SkuData } from '@/types';
import { NftType } from '@/types';
import axios from '@/utils/axios';

// export const getNftDetail = (params: { nftAddress: string }): Promise<IResponse<NftContractData>> =>
//   axios.get('/project/nft/detail', { params });
export const getNftDetail = (params: {
  nftType: NftType;
  id: number;
}): Promise<IResponse<NftContractData>> => axios.get('/mine/retail/detail', { params });

export const getNftList = (params: {
  retailId: number;
  page: number;
  limit: number;
}): Promise<IListResponse<SkuData>> => axios.get('/project/nft/list', { params });

export const getSkuDetail = (params: { tokenId: string }): Promise<IResponse<SkuData>> =>
  axios.get('/project/sku/detail', { params });

// /v2/mine/retailcontracts
export const getRetailContracts = (params: { bizId: string }): Promise<IResponse<SkuData>> =>
  axios.get('/mine/retailcontracts', { params });
