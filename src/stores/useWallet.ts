import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { ethereumClient, web3modal } from '@/utils/wallet'

export const useWalletStore = defineStore('wallet', () => {
  const state = reactive({
    address: ''
  })

  function connect() {
    web3modal.openModal()
  }

  ethereumClient.watchNetwork((network) => {
    console.log('newnetwork', network)
  })

  ethereumClient.watchAccount((newAccount) => {
    console.log({ newAccount })
    state.address = newAccount.address
  })

  return { state, connect }
})
