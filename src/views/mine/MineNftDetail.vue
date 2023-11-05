<template>
  <div class="pg-mine-nft-detail">
    <nft-contract-item v-if="data" :item="data" hideActions size="small">
      <div v-if="scenes === 'participated'" class="flex-between">
        <div>
          <label>balance:</label>
          <span>xxx USDT</span>
        </div>
        <p-button @click="handleWithdraw"> Withdraw</p-button>
      </div>
      <div v-else-if="scenes === 'store'" class="flex-between">
        <div></div>
        <!--        <p-button @click="handleShareNFT"> Share NFT</p-button>-->
      </div>
    </nft-contract-item>
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="(item, index) in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item.id)"
      >
        <template v-if="scenes === 'submitted'" v-slot:actions>
          <!-- 需要添加状态判断 -->
          <p-button v-if="index % 2 === 0" round size="small" @click="handleUp(item)">
            Up
          </p-button>
          <p-button v-else round size="small" @click="handleDown(item)"> Down</p-button>
        </template>
        <template v-else-if="scenes === 'store'" v-slot:actions>
          <p-button round size="small" @click="handleShareToken(item)"> Share</p-button>
        </template>
      </SkuItem>
    </div>
    <div v-if="scenes === 'submitted'" class="text-center">
      <p-button @click="handleAddNft">Add NFT</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useSkuList, useSpuList } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import { type Address, type NftContractData, NftType, type SkuData, type SpuData } from '@/types';

const loading = ref(false);
const projectStore = useProjectStore();
const route = useRoute();
const router = useRouter();
const scenes = computed(() => route.meta.scenes);
const { address: account } = getAccount();

const nftId = computed(() => Number(route.params.id));
const nftType = computed(() => Number(route.query.nftType));
const nftAddress = computed(() => route.query.nftAddress as string);
const projectId = computed(() => route.query.projectId as string);
const businessContractAddress = computed(() => route.query.bizAddress as string);

console.log('query', {
  nftAddress: nftAddress.value,
  projectId: projectId.value,
  businessContractAddress: businessContractAddress.value,
});

const data: NftContractData = {
  nftAddress: nftAddress.value as Address,
  avatar: route.query.avatar as string,
  nftID: '',
  name: '',
  nftType: nftType.value,
  // 随意填写一个
  bizId: 1111,
  retailAddress: route.params.retailAddress as Address,
  id: nftId.value,
};

// const { data } = useNftDetail(nftId.value, NftType.SKU);
const { data: nftList } =
  nftType.value === NftType.SKU ? useSkuList(nftId.value, 1, 25) : useSpuList(nftId.value);

console.log('nftList=', nftList);

function handleDetail(id: number) {
  if (nftType.value === NftType.SKU) {
    router.push(`/mine/${scenes.value}/sku/${nftId.value}/${id}`);
  } else {
    router.push(`/mine/${scenes.value}/spu/${nftId.value}/${id}`);
  }
}

async function handleWithdraw() {
  // TODO: handleWithdraw
  console.log('handleUp, itemhhh');
  // KOL withdraw TODO: 获取projectAddress
  try {
    loading.value = true;
    const tx = await projectStore.kolWithdraw(businessContractAddress.value as Address);
    await waitForTransaction({ hash: tx.hash });
  } catch (error) {
    ElMessage.error('Withdraw failed');
  } finally {
    loading.value = false;
  }
}

function handleShareNFT() {
  // TODO: handleSharePage
  console.log('handleShareNFT');
  // shareNft(account, projectId);
}

function handleShareToken(item: SkuData) {
  // TODO: handleShareToken
  console.log('handleShareToken, item', item);
}
function handleUp(item: SkuData | SpuData) {
  // TODO: handleUp
  console.log('handleUp, item', item);
}
function handleDown(item: SkuData | SpuData) {
  // TODO: handleDown
  console.log('handleDown, item', item);
}

function handleAddNft() {
  // TODO: handleAddNft
  console.log('handleAddNft...');
  router.push(`/project/submitsuccess/${projectId.value}`);
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
    // justify-content: space-between;
    gap: 12px;

    > div {
      cursor: pointer;
    }
  }
}
</style>
