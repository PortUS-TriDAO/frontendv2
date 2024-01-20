<template>
  <div class="nft-list-item">
    <img :src="item.avatar" alt="" />
    <div class="item-detail">
      <div class="item-info">
        <h6>Collection Name: {{ item.name }}</h6>
        <span>Address : {{ item.nftAddress }}</span>
        <span>Symbol : </span>
        <span>Standard : {{ item.nftType === 1 ? 'ERC721' : 'ERC1155' }}</span>
      </div>
      <div class="item-info-right">
        <span>Goods: </span>
        <p-button @click="handleDetail(item)">More</p-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NftContractData } from '@/types';

defineOptions({
  name: 'NftListItem',
});
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

<style lang="less" scoped>
.nft-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #0e2240;
  margin-bottom: 15px;
  border-radius: 10px;
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
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
    .item-info {
      display: flex;
      flex-direction: column;
    }
    .item-info-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
