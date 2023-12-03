<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

import FooterView from './components/FooterView.vue';
import HeaderView from './components/HeaderView.vue';
const route = useRoute();
</script>

<template>
  <div class="container">
    <HeaderView />
    <div v-if="route.fullPath !== '/'" class="banner"></div>
    <div class="main">
      <router-view></router-view>
    </div>
    <FooterView />
  </div>
</template>

<style lang="less">
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .banner {
    height: 220px;
    // background: skyblue;
    background: url('@/assets/images/banner-bg.jpg') center center no-repeat;
    background-size: cover;
  }
  .main {
    display: flex;
    flex: 1;
    // background: #f7f7f7;
    // background: red;
    background-color: rgba(6, 23, 58, 1);
  }
}
</style>
