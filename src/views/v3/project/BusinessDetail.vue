<template>
  <page-container class="pg-business-detail">
    <div class="business-detail">
      <div class="business-title">
        <h2>{{ data?.contractName }}</h2>
        <h2>
          <strong>Percent for KOL</strong>
          <span>{{ data?.sharePercentage }}%</span>
        </h2>
      </div>
      <p>Dreamed of moonshots but awoke to a capitulation.</p>
      <div class="business-mint">
        <label>righted/rights:</label>
        <span>{{ data?.righted }}/{{ data?.rights }}</span>
        <p-button :loading="loading" @click="handleMint">Mint</p-button>
      </div>
      <div>
        <span>1.2 USDT</span>
      </div>
      <text-ellipsis>{{ data?.description }}</text-ellipsis>
    </div>
    <div class="detail-divider"></div>
    <div class="list">
      <div class="list-title">NFT contract list</div>
      <div v-if="data">
        <nft-contract-item
          v-for="item in data.rows || []"
          :key="item.nftAddress"
          :item="item"
          @onDetail="handleDetail"
        />
      </div>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import { useBusinessDetail, useProjectDetail } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { NftContractData } from '@/types';

const loading = ref(false);

const route = useRoute();
const router = useRouter();
const { bizId, projectId } = route.params;
const { data } = useBusinessDetail(bizId as string);
const projectStore = useProjectStore();

const { data: projectDetail } = useProjectDetail(projectId as string);

function handleDetail(nftContractData: NftContractData) {
  router.push(`/nft/${nftContractData.nftAddress}`);
}

async function handleMint() {
  console.log('handleMint  tst...', projectDetail.value.projectAddress);
  try {
    loading.value = true;
    await projectStore.mint(projectDetail.value.projectAddress, projectId as string);
    ElMessage.success('mint success');
  } catch (error) {
    console.log('error', error);
    ElMessage.error('mint failed');
  } finally {
    loading.value = false;
  }
}
</script>
<style lang="less" scoped>
.pg-business-detail {
  .business-detail {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
    padding: 20px 28px 0 28px;
    font-size: 24px;
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

      > strong {
        font-weight: 900;
        margin-right: 19px;
      }

      > span {
        font-weight: 900;
        color: rgba(250, 101, 41, 1);
      }
    }
  }

  .business-mint {
    position: relative;

    > button {
      position: absolute;
      right: 0;
      top: 0;
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
      padding-left: 28px;
    }
  }
}
</style>
