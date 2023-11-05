<template>
  <page-container class="pg-store-nft-detail">
    <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item.id)"
      >
        <template v-slot:actions>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end">
            <p-button size="small" round v-on:click="handleBuy(item)"> Buy Now </p-button>
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
import { useNftDetail, useSkuList, useSpuList } from '@/hooks';
import { type Address, type NftContractData, NftType, type SkuData, type SpuData } from '@/types';

const route = useRoute();
const router = useRouter();
const kolAddress = route.params.kolAddress as Address;
const retailId = Number(route.params.retailId);
const nftType = Number(route.params.nftType);
// const projectId = computed(() => route.params.projectId);

// const { data } = useNftDetail(nftAddress.value as string);
const data: NftContractData = {
  nftAddress: route.query.nftAddress as Address,
  avatar: route.query.avatar as string,
  nftID: '',
  name: '',
  nftType,
  // 随意填写一个
  bizId: 1111,
  retailAddress: route.query.retailAddress as Address,
  id: retailId,
};
const { data: nftList } =
  nftType === NftType.SKU ? useSkuList(retailId, 1, 25) : useSpuList(retailId);

console.log('nftList=', nftList);

function handleDetail(id: number) {
  if (nftType === NftType.SKU) {
    router.push(`/store/${kolAddress}/sku/${retailId}/${id}`);
  } else {
    router.push(`/store/${kolAddress}/spu/${retailId}/${id}`);
  }
  // router.push(`/store/${kolAddress}/sku/${nftAddress.value}/${tokenId}`);
}

function handleBuy(item: SkuData | SpuData) {
  // TODO: buy
  console.log('handleBuy item:', item);
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
