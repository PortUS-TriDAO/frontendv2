<template>
  <div class="altc-item">
    <img :src="avatar" alt="" />
    <div class="item-detail">
      <div class="item-info">
        <h5>{{ item.contractName }}</h5>
        <span>Chain: Polygon | Currency: USDT</span>
        <p>intro: {{ item.briefIntro }}</p>
        <!-- <p>Collection: 54 | Goods: 89 | Created oct 2023</p> -->
      </div>
      <div class="item-info">
        <h5 class="ratio-title">Commission rate: {{ item.sharePercentage }}%</h5>
        <span>Righted/Rights: {{ item.rightMinted }}/{{ item.rightQuantity }}</span>
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="(item.rightMinted / item.rightQuantity) * 100"
        />
        <p-button @click="handleDetail(item)">More</p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import { useProjectStore } from '@/stores/useProject';
import type { BusinessData } from '@/types';
import { isProd } from '@/utils';
import { toBN } from '@/utils/bn';

defineOptions({ name: 'AltcItem' });
const props = defineProps<{
  scenes: string;
  item: BusinessData;
  avatar?: string;
  hideDetail?: boolean;
  btnText?: string;
}>();
const emit = defineEmits(['onDetail', 'onUploadWhiteList', 'onUploadAirdropList']);

const state = reactive({
  pendingReward: '0',
});

const projectStore = useProjectStore();

onMounted(async () => {
  let pendingReward = BigInt(0);
  if (props.scenes === 'submitted') {
    pendingReward = await projectStore.operatorPendingRewards(
      props.item.contractAddress,
      props.item.payToken,
    );
  } else if (props.scenes === 'participated') {
    pendingReward = await projectStore.referrerPendingReward(
      props.item.contractAddress,
      props.item.payToken,
    );
  }

  const decimals = isProd() ? 1e6 : 1e18;
  state.pendingReward = toBN(pendingReward.toString()).div(decimals).toString(10);
});

function handleDetail(item: BusinessData) {
  emit('onDetail', item);
}
function handleUploadWhiteList(e: Event) {
  e.stopPropagation();
  emit('onUploadWhiteList', props.item);
}

function handleUploadAirdropList(e: Event) {
  e.stopPropagation();
  emit('onUploadAirdropList', props.item);
}
</script>

<style lang="less" scoped>
.altc-item {
  background-color: #0e2240;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  &:hover {
    background-color: #274a80;
  }
  > img {
    min-width: 150px;
    height: 150px;
    margin: 10px;
  }
  .item-detail {
    display: flex;
    flex-direction: row;
    .item-info {
      width: 50%;
      margin: 5px;
      .ratio-title {
        color: #fb722f;
      }
      > h5 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 15px;
      }
      > p {
        display: -webkit-box;
        height: auto;
        word-wrap: normal;
        word-break: break-all;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > span {
        line-height: 24px;
      }
      > button {
        margin-top: 10px;
      }
    }
  }
}
</style>
