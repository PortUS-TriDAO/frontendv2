<template>
  <div class="pg-mine-sku-detail">
    <sku-card v-if="data" :item="data" @buy="handleBuy">
      <template v-if="scenes === 'submitted'" v-slot:actions>
        <p-button round @click="handleDown">Down</p-button>
        <p-button round @click="handleUp">Up</p-button>
        <p-button round @click="handleEdit">Edit</p-button>
      </template>
    </sku-card>
    <div class="detail-divider"></div>
    <div class="list-title">Items</div>
    <div class="list">
      <sku-item
        v-for="item in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        class="cursor"
        @click="handleDetail(item.tokenId)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SkuCard from '@/components/sku-card/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftList, useSkuDetail } from '@/hooks';
import type { SkuData } from '@/types';

const route = useRoute();
const router = useRouter();
const scenes = computed(() => route.meta.scenes);
const nftAddress = computed(() => route.params.nftAddress as string);
const tokenId = computed(() => route.params.tokenId as string);

const { data } = useSkuDetail(tokenId);
const { data: nftList } = useNftList(nftAddress.value);

// watch(
//   () => tokenId.value,
//   () => {
//     console.log('watch tokenId==', tokenId.value);
//     refetch();
//   },
// );

function handleBuy(skuData: SkuData) {
  console.log('handleBuy skuData==', skuData);
}
function handleDown() {
  // TODO: handleDown
  console.log('handleBuy skuData==');
}
function handleUp() {
  // TODO: handleDown
  console.log('handleBuy skuData==');
}
function handleEdit() {
  // TODO: handleEdit
  console.log('handleEdit skuData==');
}
function handleDetail(tokenId: number) {
  router.push(`/mine/${scenes.value}/nft/${nftAddress.value}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-mine-sku-detail {
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
  .el-button + .el-button {
    margin: 0;
  }
}
</style>
