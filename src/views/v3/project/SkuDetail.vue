<template>
  <page-container class="pg-sku-detail">
    <collection-header name="" :nft-type="1" address="" :goods-length="false" />
    <sku-card v-if="data" :item="data" @buy="handleBuy"> </sku-card>
  </page-container>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CollectionHeader from '@/components/collection-header/index.vue';
import SkuCard from '@/components/sku-card/index.vue';
import { useSkuDetail } from '@/hooks';

const route = useRoute();
const router = useRouter();

const retailId = computed(() => Number(route.params.retailId));
const skuId = computed(() => Number(route.params.skuId));

const { data } = useSkuDetail(skuId);

function handleBuy(id: number) {
  router.push(`/nft/sku/${retailId.value}/${id}`);
}
</script>
<style lang="less" scoped>
.pg-sku-detail {
  > :deep(article) {
    background: url('@/assets/images/article-bg.png') no-repeat;
  }
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
