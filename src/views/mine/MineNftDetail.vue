<template>
  <div class="pg-mine-nft-detail">
    <nft-contract-item v-if="data" :item="data" hideActions size="small">
      <div v-if="scenes === 'participated'" class="flex-between">
        <div>
          <label>balance:</label>
          <span>xxx USDT</span>
        </div>
        <p-button @click="handleWithdraw"> Withdraw </p-button>
      </div>
      <div v-else-if="scenes === 'store'" class="flex-between">
        <div></div>
        <p-button @click="handleShareNFT"> Share NFT </p-button>
      </div>
    </nft-contract-item>
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="(item, index) in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      >
        <template v-if="scenes === 'submitted'" v-slot:actions>
          <!-- 需要添加状态判断 -->
          <p-button v-if="index % 2 === 0" round size="small" @click="handleUp(item)">
            Up
          </p-button>
          <p-button v-else round size="small" @click="handleDown(item)"> Down </p-button>
        </template>
        <template v-else-if="scenes === 'store'" v-slot:actions>
          <p-button round size="small" @click="handleShareToken(item)"> Share </p-button>
        </template>
      </SkuItem>
    </div>
    <div v-if="scenes === 'submitted'" class="text-center">
      <p-button @click="handleAddNft">Add NFT</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useNftList } from '@/hooks';
import type { SkuData } from '@/types';

const route = useRoute();
const router = useRouter();
const scenes = computed(() => route.meta.scenes);
const nftAddress = computed(() => route.params.nftAddress as string);

const { data } = useNftDetail(nftAddress.value);
const { data: nftList } = useNftList(nftAddress.value);

console.log('nftList=', nftList);

function handleDetail(tokenId: number) {
  router.push(`/mine/submitted/nft/${nftAddress.value}/${tokenId}`);
}
function handleWithdraw() {
  // TODO: handleWithdraw
  console.log('handleUp, item');
}
function handleShareNFT() {
  // TODO: handleSharePage
  console.log('handleShareNFT');
}
function handleShareToken(item: SkuData) {
  // TODO: handleShareToken
  console.log('handleShareToken, item', item);
}
function handleUp(item: SkuData) {
  // TODO: handleUp
  console.log('handleUp, item', item);
}
function handleDown(item: SkuData) {
  // TODO: handleDown
  console.log('handleDown, item', item);
}
function handleAddNft() {
  // TODO: handleAddNft
  console.log('handleAddNft...');
}
</script>
<style lang="less" scoped>
.pg-mine-nft-detail {
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
    justify-content: space-between;
    gap: 12px;
    > div {
      cursor: pointer;
    }
  }
}
</style>
