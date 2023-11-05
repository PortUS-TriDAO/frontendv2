<template>
  <div class="pg-mine-business-detail">
    <div class="business-detail">
      <div class="business-title">
        <h2>{{ data?.contractName }}</h2>
      </div>
      <div>
        <h2>
          <strong>Percent for KOL</strong> <span class="light">{{ data?.sharePercentage }}%</span>
        </h2>
      </div>
      <div>
        <span>1.2 USDT</span>
      </div>
      <div class="flex-between">
        <div>
          <label>righted/rights:</label>
          <span>{{ data?.righted }}/{{ data?.rights }}</span>
        </div>
      </div>
      <text-ellipsis>Dreamed of moonshots but awoke to a capitulation.</text-ellipsis>
      <text-ellipsis>{{ data?.description }}</text-ellipsis>
      <div class="right-action">
        <div v-if="scenes === 'submitted'" class="balance">
          <div class="flex-between">
            <h4>balance</h4>
            <p-button :loading="loading" @click="handleWithdraw" round size="small"
              >withdraw</p-button
            >
          </div>
          <div>xx USDT</div>
        </div>
        <p-button v-else-if="scenes === 'participated'" @click="handleMintMore">Mint More</p-button>
        <p-button v-else @click="handleShare">share commercial contract</p-button>
      </div>
    </div>
    <div class="detail-divider"></div>
    <div class="list">
      <div class="list-title">NFT contract list</div>
      <div v-if="data">
        <nft-contract-item
          v-for="item in data.rows || []"
          :key="item.nftAddress"
          :item="item"
          size="small"
          @click="handleDetail(item)"
          class="pointer"
          :hide-actions="scenes !== 'submitted'"
        >
          <template v-slot:actions>
            <p-button v-if="scenes === 'submitted'" round @click="handleAddNft(item)">
              Add NFT
            </p-button>
          </template>
        </nft-contract-item>
      </div>
    </div>
    <div v-if="scenes === 'submitted'" class="text-center">
      <p-button @click="handleSubmit">Submit NFT contract</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import { useBusinessDetail } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { NftContractData } from '@/types';

const loading = ref(false);
const projectStore = useProjectStore();
const route = useRoute();
const router = useRouter();
const scenes = computed(() => route.meta.scenes);
const projectId = computed(() => route.params.projectId as string);
const businessId = computed(() => route.params.businessId as string);
const { data } = useBusinessDetail(businessId.value);

function handleDetail(nftContractData: NftContractData) {
  router.push(
    `/mine/${scenes.value}/nftdetail/${nftContractData.nftAddress}/${projectId.value}/${data.value.contractAddress}`,
  );
}

function handleMintMore() {
  // TODO: handleMintMore
  console.log('handleMintMore');
  router.push(`/project/${projectId.value}/${businessId.value}`);
}

function handleShare() {
  // TODO: handleShare
}

function handleAddNft(nftContractData: NftContractData) {
  // TODO: handleAddNft
  // router.push(`/nft/${nftContractData.nftAddress}`);
  console.log('nftContractData=', nftContractData);
  router.push(`/project/submitsuccess/${projectId.value}`);
}

async function handleWithdraw() {
  // TODO: handleWithdraw
  console.log('handleWithdraw...hahah');
  loading.value = true;

  try {
    const tx = await projectStore.operatorWithdraw(data.contractAddress);
    await waitForTransaction({ hash: tx.hash });
  } catch (error) {
    console.error(error);
    ElMessage.error('withdraw failed');
  } finally {
    loading.value = false;
  }
}

function handleSubmit() {
  // TODO: handleSubmit
  console.log('handleSubmit...');
  router.push('/project/create/step2');
}
</script>
<style lang="less" scoped>
.pg-mine-business-detail {
  .business-detail {
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 24px;
    position: relative;

    .right-action {
      position: absolute;
      right: 0;
      top: 0;
    }

    .balance {
      width: 300px;
      height: 100px;
      border-radius: 18px;
      background: #f7f7f7;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
  }

  .light {
    color: #fa6529;
  }

  .business-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h2 {
      height: 40px;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 40px;
      color: #000000;
      text-align: center;
      vertical-align: top;
    }
  }

  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }

  .list {
    .list-title {
      height: 29px;
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      color: #000;
      margin-bottom: 12px;
    }

    // :deep(.nft-contract-item) > img {
    //   width: 100px;
    //   height: 100px;
    // }
  }
}
</style>
@/hooks
