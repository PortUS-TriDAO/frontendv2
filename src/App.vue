<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HeaderView from './components/HeaderView.vue'
</script>

<template>
  <div>
    <!-- <HeaderView /> -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
