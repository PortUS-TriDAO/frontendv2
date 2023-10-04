<script setup lang="ts">
import { RouterView } from 'vue-router';

import FooterView from './components/FooterView.vue';
import HeaderView from './components/HeaderView.vue';
</script>

<template>
  <div class="container">
    <HeaderView />
    <div class="main">
      <router-view></router-view>
    </div>
    <FooterView />
  </div>
</template>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main {
    display: flex;
    flex: 1;
  }
}
</style>
