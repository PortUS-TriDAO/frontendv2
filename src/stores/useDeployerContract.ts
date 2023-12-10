import { getNetwork, readContract, waitForTransaction, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import ABI from '@/abi/deployer.abi.json';
import { ContractAddress } from '@/constant/contracts';

function createRandomNumber() {
  return Math.floor(Math.random() * 1e6);
}

export const useDeployerContractStore = defineStore('deployer', () => {
  function getDeployerContract() {
    const network = getNetwork();
    const chainId = network.chain.id;
    return {
      address: ContractAddress[chainId].deployer,
      abi: ABI,
    };
  }

  async function createMintedRetailer(
    projectContract: string,
    nftContract: string,
    nftType: number,
  ): Promise<string> {
    const salt = createRandomNumber();
    const tx = await writeContract({
      ...getDeployerContract(),
      functionName: 'createMintedRetailer',
      args: [projectContract, nftContract, nftType, salt],
    });

    await waitForTransaction({ hash: tx.hash });

    const address = await readContract({
      ...getDeployerContract(),
      functionName: 'getMintedRetailerAddress',
      args: [projectContract, nftContract, salt],
    });
    return address as string;
  }

  async function createUnmintedRetailer(
    projectContract: string,
    nftContract: string,
    nftType: number,
  ): Promise<string> {
    const salt = createRandomNumber();
    const tx = await writeContract({
      ...getDeployerContract(),
      functionName: 'createUnmintedRetailer',
      args: [projectContract, nftContract, salt],
    });

    await waitForTransaction({ hash: tx.hash });

    const address: string = (await readContract({
      ...getDeployerContract(),
      functionName: 'getUnmintedRetailerAddress',
      args: [projectContract, nftContract, nftType, salt],
    })) as string;

    return address;
  }

  return { createMintedRetailer, createUnmintedRetailer };
});
