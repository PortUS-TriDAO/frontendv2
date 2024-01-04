import { type Address, writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import WHITELIST_RIGHTS_ABI from '@/abi/whiteListRights.abi.json';
import { useProjectContract } from '@/stores/useProjectContract';

export const useWhiteListRightsContract = defineStore('whiteListRights', () => {
  async function setDropSetting(
    projectAddress: Address,
    freeMintTime: number,
    wlTime: number,
    wlAmount: number,
  ) {
    const projectContract = useProjectContract();
    const rightsContractAddress = (await projectContract.rights(projectAddress)) as Address;
    const params = {
      address: rightsContractAddress,
      abi: WHITELIST_RIGHTS_ABI,
      functionName: 'setDropSetting',
      args: [freeMintTime, wlTime, wlAmount],
    };
    return writeContract(params);
  }

  async function setMerkleRoot(projectAddress: Address, merkleRoot: string) {
    const projectContract = useProjectContract();
    const rightsContractAddress = (await projectContract.rights(projectAddress)) as Address;
    const params = {
      address: rightsContractAddress,
      abi: WHITELIST_RIGHTS_ABI,
      functionName: 'setMerkleRoot',
      args: [merkleRoot],
    };

    return writeContract(params);
  }

  async function airdrop(projectAddress: Address, recepients: string[]) {
    const projectContract = useProjectContract();
    const rightsContractAddress = (await projectContract.rights(projectAddress)) as Address;
    const params = {
      address: rightsContractAddress,
      abi: WHITELIST_RIGHTS_ABI,
      functionName: 'airdrop',
      args: [recepients],
    };

    return writeContract(params);
  }

  return { setDropSetting, setMerkleRoot, airdrop };
});
