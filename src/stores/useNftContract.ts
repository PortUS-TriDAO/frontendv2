import { readContract, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import NFT_ABI from '@/abi/nft.abi.json';

export const useNftContract = defineStore('nftContract', () => {
  async function mint(contractAddress: string, receiver: string, tokenId: number) {
    return writeContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'mint',
      args: [receiver, tokenId],
    });
  }

  async function approve(contractAddress: string, receiver: string, tokenId: number) {
    return writeContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'approve',
      args: [receiver, tokenId],
    });
  }

  async function setSeller(contractAddress: Address, seller: Address) {
    return writeContract({
      address: contractAddress,
      abi: NFT_ABI,
      function: 'setSeller',
      args: [seller, true],
    });
  }

  return { mint, approve, setSeller };
});
