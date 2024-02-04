import { getNetwork } from '@wagmi/core';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGlobalStore = defineStore('useGlobal', () => {
  const state = reactive({
    networkDialogVisible: false,
  });
  function isProd() {
    return ['www.portus.world', 'portus.world'].includes(location.host);
  }

  function setNetworkDialog(visible: boolean) {
    state.networkDialogVisible = visible;
  }

  function checkNetwork() {
    const { chain, chains } = getNetwork();
    let isSuportNetwork = true;
    const chainIds = chains.map((v) => v.id);
    if (!chainIds.includes(chain.id)) {
      state.networkDialogVisible = true;
      console.log('state=========', state.networkDialogVisible);
      isSuportNetwork = false;
    } else {
      state.networkDialogVisible = false;
      isSuportNetwork = true;
    }
    return isSuportNetwork;
  }

  return { state, isProd, setNetworkDialog, checkNetwork };
});
