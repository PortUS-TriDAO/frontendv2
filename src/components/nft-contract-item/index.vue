<template>
  <div class="business-item">
    <img alt="avatar" :src="item.avatar" />
    <div class="business-item-detail">
      <h3>{{ item.nftAddress }}</h3>
      <div>
        {{ item.nftID }}
      </div>
      <div class="flex-row-between" v-if="hideActions !== true">
        <div></div>
        <slot name="actions">
          <p-button @click="handleDetail(item)">Detail</p-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NftContractData } from '@/types';

defineOptions({ name: 'NftContractItem' });
defineProps<{
  item: NftContractData;
  hideActions?: boolean;
  // avatar: string;
}>();
const emit = defineEmits(['onDetail']);
function handleDetail(item: NftContractData) {
  emit('onDetail', item);
}
</script>
<style lang="less">
.business-item {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 20px;

  > img {
    width: 150px;
    height: 150px;
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
    gap: 30px;
    font-size: 20px;
    letter-spacing: 0px;
    line-height: 24px;
    color: #000000;
    padding: 10px;
    font-weight: 400;

    h3 {
      font-weight: inherit;
      font-size: inherit;
    }
  }
}
</style>
