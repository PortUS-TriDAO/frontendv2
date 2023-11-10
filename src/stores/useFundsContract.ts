import type { Address, ReadContractResult } from '@wagmi/core';
import { readContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import FUNDS_ABI from '@/abi/funds.abi.json';

export const useFundsContract = defineStore('fundsContract', () => {
  function operatorPendingRewards(
    fundsAddress: Address,
    token: Address,
  ): Promise<ReadContractResult> {
    return readContract({
      address: fundsAddress,
      abi: FUNDS_ABI,
      functionName: 'operatorPendingRewards',
      args: [token],
    });
  }

  function referrerPendingReward(
    fundsAddress: Address,
    token: Address,
    referrer: Address,
  ): Promise<ReadContractResult> {
    return readContract({
      address: fundsAddress,
      abi: FUNDS_ABI,
      functionName: 'pendingRewards',
      args: [token, referrer],
    });
  }

  return { operatorPendingRewards, referrerPendingReward };
});
