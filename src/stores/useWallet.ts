import { watchAccount, watchNetwork } from '@wagmi/core';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

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

  const shortAddress = computed(() => `${state.account.slice(0, 4)}...${state.account.slice(-6)}`);

  return { state, connect, shortAddress };
});
