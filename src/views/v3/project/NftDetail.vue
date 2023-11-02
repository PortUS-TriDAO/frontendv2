<template>
  <page-container class="pg-nft-detail">
    <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import avatar from '@/assets/images/demo-avatar.png';
import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useNftList } from '@/hooks';

const route = useRoute();
const router = useRouter();
const { nftAddress } = route.params;

const { data } = useNftDetail(nftAddress as string);
// console.log({ useNftDetail: data.value.name });
const { data: nftList } = useNftList(nftAddress as string);

console.log('nftList=', nftList);

// import bannerImg from './assets/banner.png';

function handleDetail(tokenId: number) {
  router.push(`/nft/${nftAddress}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-nft-detail {
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
    gap: 12px;
    > div {
      cursor: pointer;
    }
  }
}
</style>
