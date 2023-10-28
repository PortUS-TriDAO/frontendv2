import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

import type { BusinessDetailData } from '@/types';

import { getBusinessDetail } from '../api';

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
