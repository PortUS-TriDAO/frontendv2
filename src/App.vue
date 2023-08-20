<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
</script>

<template>
  <div>
    <HeaderView />
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterView />
  </div>
</template>

<style scoped>
.container {
  margin-bottom: 160px;
}
</style>
