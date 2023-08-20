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

function connect() {
  walletStore.connect()
}

function getContract() {}

watchNetwork((network) => {
  console.log('newnetwork', network)
})
</script>
<style lang="less"></style>
