import { getContract } from '@wagmi/core';
import {
  getAccount,
  getNetwork,
  readContract,
  writeContract,
  type WriteContractResult,
} from '@wagmi/core';
import type { ContractInterface } from 'ethers';

import ERC20_ABI from '@/abi/erc20.abi.json';
import PROJECT_ABI from '@/abi/project.abi.json';
import RIGHTS_ABI from '@/abi/rights.abi.json';
import ROUTER_ABI from '@/abi/router.abi.json';
import { ContractAddress } from '@/constant/contracts';
import type { Address } from '@/types';

interface IContractCall {
  address: Address;
  abi: ContractInterface;
  functionName: string;
  args: any[];
}

export function getContracts() {
  const network = getNetwork();
  const chainId = network.chain.id;
  const routerContract = {
    address: ContractAddress[chainId].router,
    abi: ROUTER_ABI,
  };

  return { routerContract };
}

export function getRouterContractFunctions() {
  function createProject(
    name: string,
    symbol: string,
    chargeERC20: Address,
    sharePercentage: string,
    maxRights: number,
  ): Promise<WriteContractResult> {
    const network = getNetwork();
    const { rights, funds } = ContractAddress[network.chain.id];
    const { routerContract } = getContracts();
    return writeContract({
      ...routerContract,
      functionName: 'createProject',
      args: [name, symbol, rights, funds, chargeERC20, sharePercentage, maxRights],
    });
  }

  async function getProjectAddress() {
    const { address } = getAccount();
    const { routerContract } = getContracts();
    const count = (await readContract({
      ...routerContract,
      functionName: 'getCountOfProjects',
      args: [address],
    })) as bigint;

    const length = count > 0n ? count - 1n : 0n;
    const projectAddress = await readContract({
      ...routerContract,
      functionName: 'projectsOfCreator',
      args: [address, length],
    });
    console.log({ projectAddress });
    return projectAddress;
  }

  return { createProject, getProjectAddress };
}

// Project Contract Functions
export function getProjectContractFunctions() {
  async function referrerSign(projectAddress: Address) {
    const params: IContractCall = {
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'referrerSign',
      args: [],
    };
    return writeContract(params);
  }

  async function getRights(projectAddress: Address) {
    return readContract({
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'rights',
      args: [],
    });
  }

  // KOL 领奖励
  async function referrerWithdraw(projectAddress: Address, tokenId: number | string) {
    return writeContract({
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'referrerWithdraw',
      args: [tokenId],
    });
  }

  // 项目方领收益
  async function operatorWithdraw(projectAddress: Address, account: Address) {
    return writeContract({
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'operatorWithdraw',
      args: [account],
    });
  }

  return { referrerSign, getRights, referrerWithdraw, operatorWithdraw };
}

// Rights Contract Functions
export function getRightsContractFunctions() {
  async function tokenOfOwnerByIndex(rightsContractAddress: Address, kolAddress: Address) {
    return readContract({
      address: rightsContractAddress,
      abi: RIGHTS_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [kolAddress, 0],
    });
  }

  return { tokenOfOwnerByIndex };
}
