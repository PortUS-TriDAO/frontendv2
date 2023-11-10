import type { Address, ReadContractResult } from '@wagmi/core';
import { readContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import FOUNDS_ABI from '@/abi/founds.abi.json';

export const useFoundsContract = defineStore('foundsContract', () => {
  function operatorPendingRewards(
    foundsAddress: Address,
    token: Address,
  ): Promise<ReadContractResult> {
    return readContract({
      address: foundsAddress,
      abi: FOUNDS_ABI,
      functionName: 'founds',
      args: [token],
    });
  }

  function referrerPendingReward(
    foundsAddress: Address,
    token: Address,
    referrer: Address,
  ): Promise<ReadContractResult> {
    return readContract({
      address: foundsAddress,
      abi: FOUNDS_ABI,
      functionName: 'pendingRewards',
      args: [token, referrer],
    });
  }

  return { operatorPendingRewards, referrerPendingReward };
});
