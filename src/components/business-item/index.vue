<template>
  <div class="business-item">
    <img alt="avatar" :src="props.avatar" />
    <div class="business-item-detail">
      <div class="flex-row-between">
        <h3>{{ props.item.contractName }}</h3>
        <div>
          <label><strong>Percent for KOL:</strong></label>
          <strong>{{ props.item.sharePercentage }}%</strong>
        </div>
      </div>
      <p>{{ props.item.briefIntro }}.</p>
      <div class="item-row2">
        <div>
          <label>items:</label>
          <span>{{ props.item.quantity }}</span>
        </div>
      </div>
      <div class="flex-row-between">
        <div>
          <label>righted/rights:</label>
          <span>{{ props.item.righted }}/{{ props.item.rights }}</span>
        </div>
        <p-button @click="handleDetail(props.item)">Detail</p-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { BusinessData } from '@/types';

const props = defineProps<{
  item: BusinessData;
  avatar: string;
  // onDetail: (item: BusinessData) => void;
}>();
const emit = defineEmits(['onDetail']);
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
