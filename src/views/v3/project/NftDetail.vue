<template>
  <page-container class="pg-nft-detail">
    <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item.id)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
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

const retailId = Number(route.params.retailId);
const nftType = Number(route.params.nftType);
const { data } = useNftDetail(retailId, nftType);

const { data: nftList } = nftType === 1 ? useSkuList(retailId) : useSpuList(retailId);

function handleDetail(id: number) {
  if (Number(nftType) === 1) {
    router.push(`/nft/sku/${retailId}/${id}`);
  } else {
    router.push(`/nft/spu/${retailId}/${id}`);
  }
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
