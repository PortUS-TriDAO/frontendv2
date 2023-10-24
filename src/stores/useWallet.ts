import { watchAccount, watchNetwork } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { web3modal } from '@/utils/wallet';
export const useWalletStore = defineStore('wallet', () => {
  const state = reactive({
    account: '',
  });

  function connect() {
    web3modal.open();
  }

  watchAccount((newAccount) => {
    console.log({ newAccount });
    state.account = newAccount.address;
  });

  watchNetwork((newnetwork) => {
    console.log({ newnetwork });
  });
  return { state, connect };
});
