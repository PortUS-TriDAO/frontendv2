import type { SignTypedDataResult } from '@wagmi/core';
import { type Address, getAccount, getNetwork, signTypedData } from '@wagmi/core';
import type { TypedDataDomain } from 'ethers';
import { defineStore } from 'pinia';

// export interface DomainType {
//   name: string;
//   version: string;
//   chainId: number;
//   verifyingContract: string;
// }

const NFT_RETAILER_TYPES = {
  NftRetailer: [
    { name: 'seller', type: 'address' },
    { name: 'payToken', type: 'address' },
    { name: 'payPrice', type: 'uint256' },
    { name: 'nftTokenId', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
} as const;
export const useSignTypedDataStore = defineStore('signTypedData', () => {
  function getNftRetailerDomain(
    name: 'MintedNftRetailer' | 'UnmintedNftRetailer',
    retailerContractAddress: string,
  ): TypedDataDomain {
    const network = getNetwork();
    const chainId = network.chain.id!;
    return {
      name,
      version: '1',
      chainId: chainId, // chainId
      verifyingContract: retailerContractAddress, // retailerContractAddress
    };
  }

  // 买家签名
  async function signMintedNftRetailer(
    payToken: Address,
    payPrice: string,
    nftTokenId: number,
    deadline: number,
    retailerAddress: Address,
  ): Promise<SignTypedDataResult> {
    const { address } = await getAccount();
    const message = {
      seller: address,
      payToken: payToken,
      payPrice,
      nftTokenId,
      deadline,
    };
    const domain = getNftRetailerDomain('MintedNftRetailer', retailerAddress);
    return signTypedData({
      domain: domain as any,
      message,
      primaryType: 'NftRetailer',
      types: NFT_RETAILER_TYPES,
    });
  }

  async function signUnmintedNftRetailer(
    payToken: Address,
    payPrice: bigint,
    nftTokenId: number,
    deadline: number,
    retailerAddress: Address,
  ): Promise<SignTypedDataResult> {
    const { address } = await getAccount();
    const message = {
      seller: address,
      payToken,
      payPrice,
      nftTokenId,
      deadline,
    };
    const domain = await getNftRetailerDomain('UnmintedNftRetailer', retailerAddress);
    return signTypedData({
      domain,
      message,
      primaryType: 'NftRetailer',
      types: NFT_RETAILER_TYPES,
    });
  }

  return { signMintedNftRetailer, signUnmintedNftRetailer };
});
