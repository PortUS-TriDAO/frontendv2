import { writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import ERC20_ABI from '@/abi/erc20.abi.json';

export const useERC20Contract = defineStore('erc20Contract', () => {
  async function approve(contractAddress: string, spender: string, amount: string) {
    return writeContract({
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spender, amount],
    });
  }

  return { approve };
});
