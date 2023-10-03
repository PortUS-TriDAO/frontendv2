import type { Address, WriteContractResult } from '@wagmi/core';
import { getAccount, getNetwork, readContract, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import ROUTER_ABI from '@/abi/router.abi.json';
import { ContractAddress } from '@/constant/contracts';
export const useRouterContract = defineStore('routerContract', () => {
  function getRouterContract() {
    const network = getNetwork();
    const chainId = network.chain.id;
    return {
      address: ContractAddress[chainId].router,
      abi: ROUTER_ABI,
    };
  }

  function createProject(
    name: string,
    symbol: string,
    chargeERC20: Address,
    sharePercentage: string,
    maxRights: number,
  ): Promise<WriteContractResult> {
    const network = getNetwork();
    const { rights, funds } = ContractAddress[network.chain.id];

    return writeContract({
      ...getRouterContract(),
      functionName: 'createProject',
      args: [name, symbol, rights, funds, chargeERC20, sharePercentage, maxRights],
    });
  }

  async function getCountOfProjects(address: Address): Promise<bigint> {
    const routerContract = getRouterContract();
    const count = await readContract({
      ...routerContract,
      functionName: 'getCountOfProjects',
      args: [address],
    });
    return count as bigint;
  }

  async function getProjectAddress() {
    const { address } = getAccount();
    const routerContract = getRouterContract();
    const count = await getCountOfProjects(address);

    const length = count > 0n ? count - 1n : 0n;
    const projectAddress = await readContract({
      ...routerContract,
      functionName: 'projectsOfCreator',
      args: [address, length],
    });
    return projectAddress;
  }

  return { createProject, getProjectAddress };
});
