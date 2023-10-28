import type { IListResponse, IResponse, NftContractData, SkuData } from '@/types';
import axios from '@/utils/axios';

export const getNftDetail = (params: { nftAddress: string }): Promise<IResponse<NftContractData>> =>
  axios.get('/project/nft/detail', { params });

export const getNftList = (params: {
  nftAddress: string;
  page: number;
  pageSize: number;
}): Promise<IListResponse<SkuData>> => axios.get('/project/nft/list', { params });
