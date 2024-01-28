<template>
  <page-container class="pg-nft-detail">
    <div class="detail-header">
      <collection-header
        :name="data?.name"
        :nft-type="1"
        :address="data?.nftAddress"
        :goods-length="nftList?.rows.length"
      />
    </div>
    <div class="detail-divider"></div>
    <!-- <div class="list-title">NFT list</div> -->`
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
import { useRoute, useRouter } from 'vue-router';

import CollectionHeader from '@/components/collection-header/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useSkuList, useSpuList } from '@/hooks';

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
  > :deep(article) {
    background: url('@/assets/images/article-bg.png') no-repeat;
  }
  .detail-header {
    height: 260px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .detail-divider {
    height: 42px;
    background: url('./assets/divider-bg.png') center center no-repeat;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 40px;
    row-gap: 40px;
    padding-top: 32px;

    > div {
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    .detail-header {
      height: 150px;
      font-size: 12px;
    }
    .list {
      grid-template-columns: 1fr 1fr;
      column-gap: 16px;
      row-gap: 16px;
      .sku-item {
        width: 100%;
      }
    }
  }
}
</style>
