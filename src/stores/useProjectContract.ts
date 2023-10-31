import type {
  Address,
  ReadContractConfig,
  ReadContractResult,
  WriteContractResult,
} from '@wagmi/core';
import { readContract, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';
import type { Abi, ContractFunctionConfig } from 'viem';

import PROJECT_ABI from '@/abi/project.abi.json';

export const useProjectContract = defineStore('projectContract', () => {
  function referrerSign(projectAddress: Address): Promise<WriteContractResult> {
    console.log('referrerSign====', projectAddress);
    return writeContract({
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'referrerSign',
      args: [],
    });
  }

  function rights(projectAddress: Address): Promise<ReadContractResult> {
    const params: ReadContractConfig = {
      address: projectAddress,
      abi: PROJECT_ABI as Abi,
      functionName: 'rights',
      args: [],
    };
    return readContract(params);
  }

  // KOL领奖励
  function referrerWithdraw(projectAddress: Address, tokenId: number) {
    const params: ContractFunctionConfig = {
      address: projectAddress,
      abi: PROJECT_ABI as Abi,
      functionName: 'referrerWithdraw',
      args: [tokenId],
    };
    return writeContract(params);
  }

  // 项目方领收益
  function operatorWithdraw(projectAddress: Address, account: Address) {
    const params: ContractFunctionConfig = {
      address: projectAddress,
      abi: PROJECT_ABI as Abi,
      functionName: 'operatorWithdraw',
      args: [account],
    };

    return writeContract(params);
  }

  return { referrerSign, rights, referrerWithdraw, operatorWithdraw };
});
