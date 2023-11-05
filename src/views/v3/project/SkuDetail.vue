<template>
  <page-container class="pg-sku-detail">
    <sku-card :loading="loading" v-if="state.detail" :item="state.detail">
      <p-button v-if="state.detail" @click="handleBuy(state.detail)">Buy</p-button>
    </sku-card>

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
import { reactive, ref, toRaw, watch } from 'vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SkuCard from '@/components/sku-card/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftList, useSkuDetail, useSkuList } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { SkuData } from '@/types';
import { toBN } from '@/utils/bn';

const loading = ref(false);
const route = useRoute();
const router = useRouter();

const state = reactive({
  detail: {},
});

const retailId = computed(() => route.params.retailId as number);
const skuId = computed(() => route.params.skuId as string);

const projectStore = useProjectStore();

const { data } = useSkuDetail(skuId);
const { data: nftList } = useSkuList(retailId.value);

watch(data, () => {
  console.log('watch data', data);
  if (data && data.value.length > 0) {
    state.detail = data.value[0];
    console.log('state.detail', data.value[0]);
  }
});

function handleDetail(tokenId: number) {
  router.push(`/nft/${nftAddress.value}/${tokenId}`);
}

function handleBuy(skuData: SkuData) {
  try {
    loading.value = true;
    console.log('handleBuy skuData==', skuData);
    console.log('retaal', toRaw(skuData));

    const info = toRaw(skuData);
    console.log('info', info);
    console.log('teklsdfjds', info.retailAddress);
    projectStore.buyMintedNft(
      info.retailAddress,
      [
        {
          seller: info.seller,
          payToken: info.payToken,
          payPrice: toBN(info.price).multipliedBy(1e18).toString(10),
          nftTokenId: info.tokenId,
          deadline: info.ddl,
          signature: info.signature,
        },
      ],
      Number(skuId.value as string),
    );
  } catch (error) {
    console.error(error);
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
