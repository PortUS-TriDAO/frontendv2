<template>
  <div class="pg-mine-business-detail">
    <div class="business-detail">
      <div class="business-title">
        <h2>{{ data?.contractName }}</h2>
      </div>
      <div>
        <label>Percent</label> <span>{{ data?.sharePercentage }}%</span>
      </div>
      <text-ellipsis>Dreamed of moonshots but awoke to a capitulation.</text-ellipsis>
      <text-ellipsis>{{ data?.description }}</text-ellipsis>
      <div class="balance">
        <div class="flex-between">
          <h4>balance</h4>
          <p-button @click="handleWithdraw" round size="small">withdraw</p-button>
        </div>
        <div>xx USDT</div>
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
          @onDetail="handleDetail"
        >
          <template v-slot:actions>
            <p-button round @click="handleAddNft(item)">Add NFT</p-button>
          </template>
        </nft-contract-item>
      </div>
    </div>
    <div class="text-center">
      <p-button @click="handleSubmit">Submit NFT contract</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import NftContractItem from '@/components/nft-contract-item/index.vue';
import { useBusinessDetail } from '@/hooks';
import type { NftContractData } from '@/types';

const route = useRoute();
const router = useRouter();
const { businessId } = route.params;
const { data } = useBusinessDetail(businessId as string);

console.log('getBusinessDetail result=', data);

function handleDetail(nftContractData: NftContractData) {
  router.push(`/nft/${nftContractData.nftAddress}`);
}
function handleAddNft(nftContractData: NftContractData) {
  // TODO: handleAddNft
  // router.push(`/nft/${nftContractData.nftAddress}`);
  console.log('nftContractData=', nftContractData);
}

function handleWithdraw() {
  // TODO: handleWithdraw
  console.log('handleMint...');
}
function handleSubmit() {
  // TODO: handleSubmit
  console.log('handleMint...');
}
</script>
<style lang="less" scoped>
.pg-mine-business-detail {
  .business-detail {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
    // padding: 20px 28px 0 28px;
    font-size: 24px;
    position: relative;
    .balance {
      position: absolute;
      right: 0;
      top: 0;
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
      padding-left: 28px;
    }
    // :deep(.nft-contract-item) > img {
    //   width: 100px;
    //   height: 100px;
    // }
  }
}
</style>
@/hooks
