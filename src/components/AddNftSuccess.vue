<template>
  <main-content>
    <div class="page-nft-success">
      <success-card>
        <p>Add NFT success！</p>
      </success-card>
      <p v-if="nftType === 'sku'">
        You can continue to
        <router-link to="/project/publish/sku">add more NFTs</router-link>
        , or add them later in
        <router-link to="/mine/submitted">Mine</router-link>
      </p>
      <p v-else>
        You can manage them in
        <router-link to="/mine/submitted">Mine</router-link>
      </p>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import MainContent from '@/components/MainContent.vue';

import SuccessCard from '../views/projects/components/SuccessCard.vue';

const props = defineProps<{
  nftType: 'sku' | 'spu';
}>();
</script>

<style lang="less" scoped>
.page-nft-success {
  padding-top: 138px;

  > p {
    margin-top: 66px;
    text-align: center;
    font-size: 20px;

    > a {
      color: #f6250c;
    }
  }
}
</style>
