<template>
  <page-container class="pg-store-nft-detail">
    <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      >
        <template v-slot:actions>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end">
            <p-button size="small" round v-on:click.stop="handleBuy(item.tokenId)">
              Buy Now
            </p-button>
          </div>
        </template>
      </SkuItem>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useNftList } from '@/hooks';

const route = useRoute();
const router = useRouter();
const storeId = computed(() => route.params.storeId);
// const projectId = computed(() => route.params.projectId);
const nftAddress = computed(() => route.params.nftAddress);

const { data } = useNftDetail(nftAddress.value as string);
// console.log({ useNftDetail: data.value.name });
const { data: nftList } = useNftList(nftAddress.value as string);

console.log('nftList=', nftList);

function handleDetail(tokenId: number) {
  router.push(`/store/${storeId.value}/nft/${nftAddress.value}/${tokenId}`);
}

function handleBuy(tokenId: number) {
  // router.push(`/store/${storeId.value}/nft/${nftAddress.value}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-store-nft-detail {
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
