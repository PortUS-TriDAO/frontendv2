import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { type ComputedRef, watch } from 'vue';

// import { getAccount } from '@wagmi/core';
import type {
  BusinessDetailData,
  NftContractData,
  PageData,
  ProjectData,
  ProjectDetailData,
  SkuData,
} from '@/types';

import {
  getBusinessDetail,
  getNftDetail,
  getNftList,
  getProjectDetail,
  getProjects,
  getSkuDetail,
} from '../api';

export function useProjects(key?: string): UseQueryReturnType<PageData<ProjectData>, Error> {
  // const { address } = getAccount();
  const result = useQuery({
    queryKey: ['getProjects', key],
    queryFn: async () => {
      const res = await getProjects(key);
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
      const res = await getProjectDetail({ projectId });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

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

export function useSkuDetail(tokenId: ComputedRef<string>): UseQueryReturnType<SkuData, Error> {
  const result = useQuery({
    queryKey: ['getSkuDetail', tokenId.value],
    queryFn: async () => {
      const res = await getSkuDetail({ tokenId: tokenId.value });
      console.log('getSkuDetail:', res);
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  watch(
    () => tokenId.value,
    () => {
      result.refetch();
    },
  );

  return result;
}
