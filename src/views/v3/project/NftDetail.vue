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
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import {
  useNftDetail,
  useNftList,
  useSkuDetail,
  useSkuList,
  useSpuDetail,
  useSpuList,
} from '@/hooks';

const route = useRoute();
const router = useRouter();
const state = reactive({
  nftList: [],
});

const retailId = route.params.retailId as number;
const nftType = route.params.nftType as number;
const { data } = useNftDetail(retailId, nftType);

const { data: skuList } = useSkuList(retailId);
const { data: spuList } = useSpuList(retailId);

if (nftType === 1) {
  state.nftList = skuList.value;
} else {
  state.nftList = spuList.value;
}

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
