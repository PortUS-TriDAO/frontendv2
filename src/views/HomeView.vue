<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/useWallet'

const store = useWalletStore()
const account = computed(() => store.state.address)

function connect() {
  store.connect()
}
</script>

<template>
  <main>
    <el-button type="primary" @click="connect">connect</el-button>
    {{ account }}
  </main>
</template>
