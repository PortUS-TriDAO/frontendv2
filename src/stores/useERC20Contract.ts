import type { Address } from '@wagmi/core';
import { readContract, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import ERC20_ABI from '@/abi/erc20.abi.json';

export const useERC20Contract = defineStore('erc20Contract', () => {
  async function approve(contractAddress: Address, spender: string, amount: string) {
    return writeContract({
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spender, amount],
    });
  }

  async function allowance(contractAddress: Address, owner: string, spender: string) {
    return readContract({
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [owner, spender],
    });
  }

  return { approve, allowance };
});
