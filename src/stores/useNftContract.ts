import type { Address, ReadContractResult, WriteContractResult } from '@wagmi/core';
import { getAccount, readContract, writeContract } from '@wagmi/core';
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

  async function setApprovalForAll(
    contractAddress: Address,
    operator: Address,
    approved: boolean,
  ): Promise<WriteContractResult> {
    return writeContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'setApprovalForAll',
      args: [operator, approved],
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

  async function tokenURI(contractAddress: Address, tokenId: number): Promise<ReadContractResult> {
    return readContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'tokenURI',
      args: [tokenId],
    });
  }

  async function isApprovedForAll(
    contractAddress: Address,
    operator: Address,
  ): Promise<ReadContractResult> {
    const { address } = getAccount();
    return readContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'isApprovedForAll',
      args: [address, operator],
    });
  }

  return { mint, approve, setSeller, tokenURI, setApprovalForAll, isApprovedForAll };
});
