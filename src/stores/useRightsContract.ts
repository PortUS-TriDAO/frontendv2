import type { Address } from '@wagmi/core';
import { readContract } from '@wagmi/core';
import { defineStore } from 'pinia';
import type { Abi, ContractFunctionConfig } from 'viem';

import RIGHTS_ABI from '@/abi/rights.abi.json';

export const useRightsContract = defineStore('rightsContract', () => {
  function tokenOfOwnerByIndex(rightsContractAddress: Address, kolAddress: Address) {
    const params: ContractFunctionConfig = {
      address: rightsContractAddress,
      abi: RIGHTS_ABI as Abi,
      functionName: 'tokenOfOwnerByIndex',
      args: [kolAddress, 0],
    };
    return readContract(params);
  }

  return { tokenOfOwnerByIndex };
});
