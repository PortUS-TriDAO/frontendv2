<template>
  <div class="collection-header">
    <div class="right">
      <span v-if="name">Collection Name：{{ name }}</span>
      <span>Standard: {{ nftType === 0 ? 'ERC721' : 'ERC1155' }}</span>
      <span v-if="address">
        Address:
        <short-address :address="address" />
      </span>
      <span v-if="goodsLength !== false">Goods: {{ goodsLength || 0 }}</span>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  name: String;
  address: String;
  nftType: number;
  goodsLength?: number | boolean;
}>();
</script>
<style>
.collection-header {
  background: url('@/assets/images/article-link.png') no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  height: 200px;
  margin-bottom: 50px;
  font-size: 14px;
  .right {
    width: 230px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @media (max-width: 768px) {
    background-image: url('@/assets/images/article-link-mobile.png');
    background-size: 70%;
    font-size: 12px;
    height: 200px;
    .right {
      gap: 0px;
      width: auto;
    }
  }
}
</style>
