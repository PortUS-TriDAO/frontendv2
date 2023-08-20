<template>
  <div class="page-header">
    <div class="header-container">
      <div class="logo"></div>
      <div class="menus">
        <ul>
          <li>Home</li>
          <li>Project</li>
          <li>Mine</li>
        </ul>
        <button v-if="!account" @click="connect">connect</button>
        <button v-else>{{ shortAddress }}</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/useWallet'
const walletStore = useWalletStore()

const account = computed(() => walletStore.state.account)
const shortAddress = computed(
  () =>
    walletStore.state.account &&
    `${walletStore.state.account.slice(0, 6)}...${walletStore.state.account.slice(-4)}`
)
function connect() {
  walletStore.connect()
}
</script>
<style lang="less">
.page-header {
  height: 66px;
  background-color: #000425;
  .header-container {
    width: 1400px;
    margin: 0 auto;
    line-height: 66px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 105px;
      height: 32px;
      background: url('@/assets/logo.png') center center no-repeat;
      background-size: contain;
    }
    .menus {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;
      > ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        > li {
          margin-right: 80px;
          font-size: 16px;
          cursor: pointer;
          opacity: 0.5;
        }
        .hight-light {
          opacity: 1;
        }
      }
      > button {
        width: 185px;
        height: 40px;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
      }
    }
  }
}
</style>
