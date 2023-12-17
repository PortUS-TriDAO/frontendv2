<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

import FooterView from './components/FooterView.vue';
import HeaderView from './components/HeaderView.vue';
const route = useRoute();
const title = ref('');
const showBanner = ref(false);

watch(
  () => route.path,
  () => {
    if (route.path.startsWith('/mine')) {
      title.value = 'My Profile';
    } else if (route.path.startsWith('/project')) {
      title.value = 'Project';
    } else if (route.path.startsWith('/store')) {
      title.value = 'Store';
    } else if (route.path.startsWith('/faucet')) {
      title.value = 'Faucet';
    } else {
      title.value = '';
    }
    showBanner.value === (route.fullPath !== '/' && route.fullPath !== '/goods');
  },
);
</script>

<template>
  <div class="container">
    <HeaderView />
    <div v-if="showBanner" class="banner">
      {{ title }}
    </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #fff;
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
