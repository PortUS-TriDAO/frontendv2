import { writeContract } from '@wagmi/core';
import { defineStore } from 'pinia';

import WHITELIST_RIGHTS_ABI from '@/abi/whiteListRights.abi.json';

export const useWhiteListRightsContract = defineStore('whiteListRights', () => {
  function setDropSetting(freeMintTime: number, wlTime: number, wlAmount: number) {
    const params = {
      address: '',
      abi: WHITELIST_RIGHTS_ABI,
      functionName: 'setDropSetting',
      args: [freeMintTime, wlTime, wlAmount],
    };
    return writeContract(params);
  }

  function setMerkleRoot(merkleRoot: string) {
    const params = {
      address: '',
      abi: WHITELIST_RIGHTS_ABI,
      functionName: 'setMerkleRoot',
      args: [merkleRoot],
    };

    return writeContract(params);
  }

  return { setDropSetting, setMerkleRoot };
});
