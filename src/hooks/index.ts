import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { getAccount } from '@wagmi/core';
import { type ComputedRef, watch } from 'vue';

import type {
  BusinessDetailData,
  NftContractData,
  NftType,
  PageData,
  PrimaryProjectInfo,
  ProjectData,
  ProjectDetailData,
  RightData,
  SkuData,
  SkuSpuData,
  SpuData,
  TicketInfo,
} from '@/types';

import {
  getAllSkuSpu,
  getBusinessDetail,
  getkolRightId,
  getNftDetail,
  // getNftList,
  getParticipateProjects,
  getPrimaryProjectInfo,
  getProjectDetail,
  getProjects,
  getSkuDetail,
  getSkuList,
  getSpuDetail,
  getSpuList,
  getSubmittedProjects,
  getTicketDetail,
  getUserTickets,
} from '../api';

export function useProjects(key?: string): UseQueryReturnType<PageData<ProjectData>, Error> {
  const result = useQuery({
    queryKey: ['getProjects'],
    queryFn: async () => {
      const { success, data } = await getProjects({ key });
      if (!success) return null;
      return data;
    },
  });
  return result;
}

export function useScenesProjects(
  scenes: ComputedRef<'submitted' | 'participated' | 'store'>,
): UseQueryReturnType<PageData<ProjectData>, Error> {
  const { address } = getAccount();
  const submittedResult = useQuery({
    queryKey: ['useScenesProjects', address],
    queryFn: async () => {
      const { success, data } =
        scenes.value === 'submitted'
          ? await getSubmittedProjects({ creatorAddress: address })
          : await getParticipateProjects({ kolAddress: address });
      if (!success) return null;
      return data;
    },
  });

  watch(
    () => scenes.value,
    () => {
      submittedResult.refetch();
    },
  );

  console.log('scenes result===', submittedResult);
  return submittedResult;
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
  businessId: number,
): UseQueryReturnType<BusinessDetailData, Error> {
  const result = useQuery({
    queryKey: ['getBusinessDetail', businessId],
    queryFn: async () => {
      const res = await getBusinessDetail({ bizId: businessId.toString() });
      if (res.success) {
        return res.data;
      }
      return null;
    },
    enabled: !!businessId,
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

export function useProjectSkuSpu(
  projectId: number,
  // page?: number,
  // limit?: number,
): UseQueryReturnType<SkuSpuData[], Error> {
  const result = useQuery({
    queryKey: ['getSkuList', projectId],
    queryFn: async () => {
      const res = await getAllSkuSpu({ projectId });
      if (res.success) {
        const arr: SkuSpuData[] = (res?.data?.sku || []).map((item) => ({
          ...item,
          nftQuantity: 1,
          cover: '',
          isSku: true,
        }));
        const spu = (res?.data?.spu || []).map((item) => ({ ...item, isSku: false }));
        arr.concat(spu);
        console.log('arr==', arr);
        return arr;
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

export function useSpuDetail(spuId: ComputedRef<number>): UseQueryReturnType<SpuData, Error> {
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

export function useKolRightId(
  bizId: number,
  kolAddress: string,
): UseQueryReturnType<RightData, Error> {
  const result = useQuery({
    queryKey: ['getkolRightId', bizId, kolAddress],
    queryFn: async () => {
      const { success, data } = await getkolRightId({ bizId, kolAddress });
      if (!success) throw new Error('query kol rightId failed');
      return data;
    },
  });
  return result;
}

export function usePrimaryProjectInfo(): UseQueryReturnType<Array<PrimaryProjectInfo>, Error> {
  const result = useQuery({
    queryKey: ['getPrimaryProjectInfo'],
    queryFn: async () => {
      const { success, data } = await getPrimaryProjectInfo();
      if (!success) return null;
      return data;
    },
  });
  return result;
}

export function useTicketList(owner: string): UseQueryReturnType<PageData<TicketInfo>, Error> {
  const result = useQuery({
    queryKey: ['getUserTickets', owner],
    queryFn: async () => {
      const { success, data } = await getUserTickets({ owner });
      if (!success) return null;
      return data;
    },
    enabled: !!owner,
  });
  return result;
}

export function useTicketToken(owner: string): UseQueryReturnType<string, Error> {
  const result = useQuery({
    queryKey: ['getUserTickets_ticketToken', owner],
    queryFn: async () => {
      const { success, data } = await getUserTickets({ owner });
      if (!success) return null;
      return data.rows?.[0]?.ticketToken;
    },
    enabled: !!owner,
  });
  return result;
}

export function useTicketDetail(ticketId: number): UseQueryReturnType<TicketInfo, Error> {
  const result = useQuery({
    queryKey: ['getTicketDetail', ticketId],
    queryFn: async () => {
      const { success, data } = await getTicketDetail({ ticketId });
      if (!success) return null;
      return data;
    },
  });
  return result;
}
