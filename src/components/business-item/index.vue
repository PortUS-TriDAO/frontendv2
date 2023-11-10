<template>
  <div class="business-item">
    <img v-if="avatar" alt="avatar" :src="avatar" />
    <div class="business-item-detail">
      <div class="flex-row-between">
        <h3>{{ item.contractName }}</h3>
        <div>
          <label><strong>Percent for KOL:</strong></label>
          <strong>{{ item.sharePercentage }}%</strong>
        </div>
      </div>
      <p>{{ item.briefIntro }}.</p>
      <div>
        <div>
          <label>righted/rights:</label>
          <span>{{ item.rightMinted }}/{{ item.rightQuantity }}</span>
        </div>
      </div>
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
            {{ btnText || 'Detail' }}
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
const emit = defineEmits(['onDetail']);

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
    gap: 18px;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 29px;
    color: #000000;
    padding-top: 10px;

    h3 {
      font-weight: 700;
      font-size: 24px;
    }

    > p {
      font-weight: 400;
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
}
</style>
