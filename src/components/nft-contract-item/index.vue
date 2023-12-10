<template>
  <div
    :class="[
      'nft-contract-item',
      {
        'nft-contract-item--small': size === 'small',
      },
    ]"
  >
    <img alt="avatar" :src="item.avatar" />
    <div class="nft-contract-item-detail">
      <h3>{{ item.nftAddress }}</h3>
      <!-- <div>
        {{ item.nftID }}
      </div> -->
      <div class="flex-between" v-if="hideActions !== true">
        <div></div>
        <slot name="actions">
          <p-button @click="handleDetail(item)">Detail</p-button>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NftContractData } from '@/types';

defineOptions({ name: 'NftContractItem' });
defineProps<{
  item: NftContractData;
  hideActions?: boolean;
  size?: 'small';
  // avatar: string;
}>();
const emit = defineEmits(['onDetail']);
function handleDetail(item: NftContractData) {
  emit('onDetail', item);
}
</script>
<style lang="less">
.nft-contract-item {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 10px;
  // background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: rgba(243, 247, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  background-image: url('@/assets/images/card-bg.png');
  background-repeat: no-repeat;
  background-size: 50%;

  > img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .nft-contract-item-detail {
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
  &.nft-contract-item--small {
    > img {
      width: 100px;
      height: 100px;
    }
    .nft-contract-item-detail {
      gap: 10px;
    }
  }
}
</style>
