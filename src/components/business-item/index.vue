<template>
  <div class="business-item">
    <!-- <img v-if="avatar" alt="avatar" :src="avatar" /> -->
    <div class="business-item-detail">
      <div class="flex-row-between">
        <h3>{{ item.contractName }}</h3>
        <div style="padding-right: 50px">
          <div style="margin-bottom: 10px">
            <label>righted/rights:</label>
            <span>{{ item.rightMinted }}/{{ item.rightQuantity }}</span>
          </div>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="(item.rightMinted / item.rightQuantity) * 100"
          />
        </div>
      </div>
      <p v-if="scenes !== 'submitted'">Project intro: {{ item.briefIntro }}.</p>
      <div>
        <div>
          <label>Percent for KOL:</label>
          <span>{{ item.sharePercentage }}%</span>
        </div>
      </div>
      <template v-if="scenes === 'submitted'">
        <div class="line-white-list">
          <div>
            <label>White list:</label>
            <span>{{ item.whitelistCount }}/450</span>
          </div>
          <button class="btn-upload" @click="handleUploadWhiteList"></button>
        </div>
      </template>
      <div v-if="scenes === 'submitted' || scenes === 'participated'">
        <div>
          <label>Withdraw Balance:</label>
          <span>{{ state.pendingReward }} USDT</span>
        </div>
      </div>
      <div class="flex-row-between">
        <div>
          <!-- <label>items:</label>
          <span>{{ item.quantity }}</span> -->
        </div>
        <slot name="actions">
          <p-button v-if="!hideDetail" @click="handleDetail(item)">
            {{ btnText || 'See more' }}
          </p-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import { useProjectStore } from '@/stores/useProject';
import type { BusinessData } from '@/types';
import { toBN } from '@/utils/bn';

defineOptions({ name: 'BusinessItem' });
const props = defineProps<{
  scenes: string;
  item: BusinessData;
  avatar?: string;
  hideDetail?: boolean;
  btnText?: string;
}>();
const emit = defineEmits(['onDetail', 'onUploadWhiteList']);

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

  state.pendingReward = toBN(pendingReward.toString()).div(1e18).toString(10);
});

function handleDetail(item: BusinessData) {
  emit('onDetail', item);
}
function handleUploadWhiteList(e: Event) {
  e.stopPropagation();
  emit('onUploadWhiteList', props.item);
}
</script>
<style lang="less">
.business-item {
  display: flex;
  flex-direction: row;
  gap: 38px;
  padding: 24px 30px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 20px;
  border-radius: 40px;
  background-color: rgba(243, 247, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  background-image: url('@/assets/images/item-bg-1.jpg');
  background-repeat: no-repeat;
  font-size: 20px;
  line-height: 1.5;

  > img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .flex-row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .business-item-detail {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    letter-spacing: 0px;
    color: #000000;
    padding-top: 10px;

    h3 {
      font-weight: 700;
      font-size: 24px;
    }

    > p {
      font-weight: 400;
      font-size: 20px;
    }

    .item-row2 {
      display: flex;
      flex-direction: row;
      align-items: center;

      label {
        margin-right: 4px;
      }

      div:first-child {
        width: 245px;
      }

      strong {
        font-weight: 700;
      }
    }
  }
  .line-white-list {
    display: inline-flex;
    align-items: center;
    > div {
      width: 172px;
    }
    .btn-upload {
      margin-left: 16px;
      border: none;
      width: 24px;
      height: 24px;
      cursor: pointer;
      background: transparent url('@/assets/images/icon-upload.png') center center;
    }
  }
}
</style>
