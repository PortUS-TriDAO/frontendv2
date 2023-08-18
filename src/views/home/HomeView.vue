<template lang="">
  <div>
    <el-button @click="connect">connect</el-button>
    <el-button @click="getContract">getContract</el-button>
  </div>
</template>
<script setup lang="ts">
import { useWalletStore } from '@/stores/useWallet'
import { watchNetwork } from '@wagmi/core'

const walletStore = useWalletStore()
const contractStore = useContractStore()

function connect() {
  walletStore.connect()
}

function getContract() {
  const address = contractStore.getContractAddress()
  console.log('address===', address)
}

watchNetwork((network) => {
  console.log('newnetwork', network)
})
</script>
<style lang="less"></style>
