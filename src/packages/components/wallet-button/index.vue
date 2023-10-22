<template>
  <div>
      <p-button v-if="account" v-bind="props"><slot></slot></p-button>
      <p-button v-else v-on:click.stop="connect">Connect Wallet</p-button>
  </div>
</template>

<script setup lang="ts">
import {useWeb3Modal} from "@web3modal/wagmi/vue";
import {useWalletStore} from "@/stores/useWallet";
import {buttonProps} from "element-plus";
import { computed } from "vue";

const walletStore = useWalletStore()
const web3Modal = useWeb3Modal()

const props = defineProps({
  ...buttonProps
})

const account = computed(()=>walletStore.state.account)
function connect(e) {
  web3Modal.open()
  e.preventDefault()
}
</script>

<style lang="less" scoped>

</style>