<template>
  <div class="nft-list-item">
    <img :src="item.avatar" alt="avatar" />
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
  @media screen and (max-width: 768px) {
    gap: 10px;
    > img {
      min-width: 100px;
      height: 100px;
      margin: 0;
    }
    .item-detail {
      padding: 0;
      margin: 0;
      font-size: 12px;
      gap: 0;
      flex-wrap: wrap;
      overflow: hidden;
    }
    .item-info {
      gap: 4px;
      h6 {
        font-size: 12px;
      }
    }
    .item-info-right > button {
      height: 32px;
      width: 100px;
      min-width: 100px;
      font-size: 18px;
      margin-top: 10px;
    }
  }
}
</style>
