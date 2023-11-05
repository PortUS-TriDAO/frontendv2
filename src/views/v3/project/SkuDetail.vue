<template>
  <page-container class="pg-sku-detail">
    <div class="detail-divider"></div>
    <div class="list-title">Items</div>
    <div class="list">
      <sku-item
        v-for="item in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item.id)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SkuItem from '@/components/sku-item/index.vue';
import { useSkuList } from '@/hooks';

const route = useRoute();
const router = useRouter();

const retailId = computed(() => Number(route.params.retailId));

const { data: nftList } = useSkuList(retailId.value);

function handleDetail(id: number) {
  router.push(`/nft/sku/${retailId.value}/${id}`);
}
</script>
<style lang="less" scoped>
.pg-sku-detail {
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }

  .list-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
    margin: 0 0 14px 0;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;

    > div {
      cursor: pointer;
    }
  }
}
</style>
