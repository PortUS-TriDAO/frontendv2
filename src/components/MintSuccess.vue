<template>
  <main-content>
    <div class="mint-success-box">
      <success-card class="box-top">
        <p>Apply success!</p>
      </success-card>
      <div class="box-middle">
        <p>
          <span>You can continue to</span>
          <p-button @click="toMintMore"> Apply More</p-button>
          <span>or go to the</span>
          <p-button @click="toMine">Mine</p-button>
          page now.
        </p>
      </div>
    </div>
  </main-content>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import SuccessCard from '@/views/projects/components/SuccessCard.vue';

const router = useRouter();

function toMintMore() {
  router.push('/project/list');
}

function toMine() {
  router.push('/mine/participated');
}
</script>

<style lang="less" scoped>
.mint-success-box {
  padding-top: 150px;

  .box-middle {
    margin: 0 auto;
    text-align: center;
    margin-top: 30px;

    button {
      margin: 0 10px;
    }
  }
}
</style>
