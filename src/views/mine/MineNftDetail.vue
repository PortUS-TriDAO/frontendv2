<template>
  <div class="pg-mine-nft-detail">
    <nft-contract-item v-if="data" :item="data" hideActions size="small" />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="(item, index) in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      >
        <template v-slot:actions>
          <!-- 需要添加状态判断 -->
          <p-button v-if="index % 2 === 0" round size="small" @click="handleUp(item)">
            Up
          </p-button>
          <p-button v-else round size="small" @click="handleDown(item)"> Down </p-button>
        </template>
      </SkuItem>
    </div>
    <div class="text-center">
      <p-button @click="handleAddNft">Add NFT</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useNftList } from '@/hooks';
import type { SkuData } from '@/types';

const route = useRoute();
const router = useRouter();
const { nftAddress } = route.params;

const { data } = useNftDetail(nftAddress as string);
const { data: nftList } = useNftList(nftAddress as string);

console.log('nftList=', nftList);

// import bannerImg from './assets/banner.png';

function handleDetail(tokenId: number) {
  router.push(`/mine/submitted/nft/${nftAddress}/${tokenId}`);
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
