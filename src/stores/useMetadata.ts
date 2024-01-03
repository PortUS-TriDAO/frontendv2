import { defineStore } from 'pinia';

const API_KEY = import.meta.env.VITE_API_KEY;
export const useMetadata = defineStore('nftMetadata', () => {
  async function getNft(nftAddress: string, tokenId: number, chain = 'matic') {
    const result = await fetch(
      `https://api.opensea.io/api/v2/chain/${chain}/contract/${nftAddress}/nfts/${tokenId}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      },
    ).then((r) => r.json());
    return result;
  }

  return { getNft };
});
