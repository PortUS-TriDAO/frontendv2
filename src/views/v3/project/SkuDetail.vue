<template>
  <page-container class="pg-sku-detail">
    <sku-card :loading="loading" v-if="data" :item="data" @buy="handleBuy" />
    <div class="detail-divider"></div>
    <div class="list-title">Items</div>
    <div class="list">
      <sku-item
        v-for="item in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SkuCard from '@/components/sku-card/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftList, useSkuDetail } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { SkuData } from '@/types';

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const { nftAddress, tokenId } = route.params;

const { data } = useSkuDetail(tokenId as string);
const { data: nftList } = useNftList(nftAddress as string);

function handleDetail(tokenId: number) {
  router.push(`/nft/${nftAddress}/${tokenId}`);
}

function handleBuy(skuData: SkuData) {
  try {
    loading.value = true;
    console.log('handleBuy', {
      retailerAddress: data.value.retailerAddress,
      params: {
        seller: data.value.seller,
        payToken: data.value.payToken,
        payPrice: data.value.price,
        nftTokenId: data.value.tokenId,
        deadline: data.value.deadline,
        signature: data.value.signature,
      },
      tokenId,
    });
    console.log('handleBuy skuData==', skuData);
    projectStore.buyMintedNft(
      data.value.retailerAddress,
      [
        {
          seller: data.value.seller,
          payToken: data.value.payToken,
          payPrice: BigInt(data.value.price),
          nftTokenId: data.value.tokenId,
          deadline: data.value.deadline,
          signature: data.value.signature,
        },
      ],
      Number(tokenId as string),
    );
  } catch (error) {
    ElMessage.error('buy failed');
  } finally {
    loading.value = false;
  }
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
