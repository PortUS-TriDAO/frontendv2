import { getAccount, readContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import { getContracts } from './useContract';

export const NFT_ADDRESS = '0x4f9b3024EbcFbac44cEA45e65f7292cFa3B570eD';

export const useTicketStore = defineStore('useTicket', () => {
  function balanceOf() {
    const { address } = getAccount();
    const { enumContract } = getContracts();
    return readContract({
      address: enumContract.address,
      abi: enumContract.abi,
      functionName: 'balanceOf',
      args: [NFT_ADDRESS, address, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
    });
  }

  return { balanceOf };
});
