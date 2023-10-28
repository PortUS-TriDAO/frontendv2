import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

import type { BusinessDetailData, NftContractData, PageData, SkuData } from '@/types';

import { getBusinessDetail, getNftDetail, getNftList } from '../api';

export function useBusinessDetail(
  businessId: string,
): UseQueryReturnType<BusinessDetailData, Error> {
  const result = useQuery({
    queryKey: ['getBusinessDetail', businessId],
    queryFn: async () => {
      const res = await getBusinessDetail({ businessId });
      if (!res.success) {
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
      console.log('res', res);
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
  return result;
}
