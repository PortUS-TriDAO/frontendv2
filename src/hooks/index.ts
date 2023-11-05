import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { getAccount } from '@wagmi/core';
import { type ComputedRef, type Ref, watch } from 'vue';

import type {
  BusinessDetailData,
  NftContractData,
  NftType,
  PageData,
  ProjectData,
  ProjectDetailData,
  SkuData,
  SpuData,
} from '@/types';

import {
  getBusinessDetail,
  getNftDetail,
  // getNftList,
  getParticipateProjects,
  getProjectDetail,
  getProjects,
  getSkuDetail,
  getSkuList,
  getSpuDetail,
  getSpuList,
  getSubmittedProjects,
} from '../api';

export function useProjects(): UseQueryReturnType<PageData<ProjectData>, Error> {
  const result = useQuery({
    queryKey: ['getProjects'],
    queryFn: async () => {
      const { success, data } = await getProjects({});
      if (!success) return null;
      return data;
    },
  });
  return result;
}

export function useParticipateProjects(): UseQueryReturnType<PageData<ProjectData>, Error> {
  const { address } = getAccount();
  const result = useQuery({
    queryKey: ['getParticipateProjects', address],
    queryFn: async () => {
      const { success, data } = await getParticipateProjects({ kolAddress: address });
      if (!success) return null;
      return data;
    },
  });
  return result;
}

export function useSubmittedProjects(): UseQueryReturnType<PageData<ProjectData>, Error> {
  const { address } = getAccount();
  const result = useQuery({
    queryKey: ['getSubmittedProjects', address],
    queryFn: async () => {
      const { success, data } = await getSubmittedProjects({ creatorAddress: address });
      if (!success) return null;
      return data;
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
      const res = await getBusinessDetail({ bizId: businessId });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useNftDetail(
  id: number,
  nftType: NftType,
): UseQueryReturnType<NftContractData, Error> {
  const result = useQuery({
    queryKey: ['getNftDetail', id, nftType],
    queryFn: async () => {
      const res = await getNftDetail({ id, nftType });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useNftList(
  retailId: number,
  page?: number,
  limit?: number,
): UseQueryReturnType<PageData<SkuData>, Error> {
  const result = useQuery({
    queryKey: ['getSkuList', retailId, page, limit],
    queryFn: async () => {
      const res = await getSkuList({ retailId, page, limit });
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}

export function useSkuDetail(skuId: ComputedRef<number>): UseQueryReturnType<SkuData, Error> {
  const result = useQuery({
    queryKey: ['getSkuDetail', skuId.value],
    queryFn: async () => {
      const res = await getSkuDetail({ skuId: skuId.value });
      console.log('getSkuDetail:', res);
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  watch(
    () => skuId.value,
    () => {
      result.refetch();
    },
  );

  return result;
}

export function useSkuList(
  retailId: number,
  page?: number,
  limit?: number,
): UseQueryReturnType<PageData<SkuData>, Error> {
  const result = useQuery({
    queryKey: ['getSkuList', retailId, page, limit],
    queryFn: async () => {
      const res = await getSkuList({ retailId: retailId, page, limit });
      if (!res.success) return null;
      return res.data;
    },
  });

  return result;
}

export function useSpuList(
  retailId: number,
  page?: number,
  limit?: number,
): UseQueryReturnType<PageData<SpuData>, Error> {
  const result = useQuery({
    queryKey: ['getSpuList', retailId, page, limit],
    queryFn: async () => {
      const res = await getSpuList({ retailId: retailId, page, limit });
      if (!res.success) return null;
      return res.data;
    },
  });

  return result;
}

export function useSpuDetail(spuId: ComputedRef<number>): UseQueryReturnType<SpuData[], Error> {
  const result = useQuery({
    queryKey: ['getSpuDetail', spuId.value],
    queryFn: async () => {
      const res = await getSpuDetail({ spuId: spuId.value });
      if (!res.success) return null;
      return res.data;
    },
  });
  watch(
    () => spuId.value,
    () => {
      result.refetch();
    },
  );

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
