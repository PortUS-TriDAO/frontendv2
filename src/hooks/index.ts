import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

import type {
  BusinessDetailData,
  NftContractData,
  PageData,
  ProjectDetailData,
  SkuData,
} from '@/types';

import {
  getBusinessDetail,
  getNftDetail,
  getNftList,
  getProjectDetail,
  getSkuDetail,
} from '../api';

export function useBusinessDetail(
  businessId: string,
): UseQueryReturnType<BusinessDetailData, Error> {
  const result = useQuery({
    queryKey: ['getBusinessDetail', businessId],
    queryFn: async () => {
      const res = await getBusinessDetail({ businessId });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useNftDetail(nftAddress: string): UseQueryReturnType<NftContractData, Error> {
  const result = useQuery({
    queryKey: ['getNftDetail', nftAddress],
    queryFn: async () => {
      const res = await getNftDetail({ nftAddress });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useNftList(
  nftAddress: string,
  page?: number,
  pageSize?: number,
): UseQueryReturnType<PageData<SkuData>, Error> {
  const result = useQuery({
    queryKey: ['getNftList', nftAddress],
    queryFn: async () => {
      const res = await getNftList({ nftAddress, page, pageSize });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useSkuDetail(tokenId: string): UseQueryReturnType<SkuData, Error> {
  const result = useQuery({
    queryKey: ['getSkuDetail', tokenId],
    queryFn: async () => {
      const res = await getSkuDetail({ tokenId });
      console.log('getSkuDetail:', res);
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useProjectDetail(projectId: string): UseQueryReturnType<ProjectDetailData, Error> {
  const result = useQuery({
    queryKey: ['getProjectDetail', projectId],
    queryFn: async () => {
      const { success, data } = await getProjectDetail({ projectId });
      console.log({ success, data });
      if (!success) throw new Error('query project detail failed');
      return data;
    },
  });
  console.log({ useProjectDetail: result });
  return result;
}
