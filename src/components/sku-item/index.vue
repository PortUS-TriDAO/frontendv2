<template>
  <div class="sku-item">
    <img alt="avatar" :src="item.avatar" />
    <h3>{{ item.nftName }}</h3>
    <div>
      {{ item.price }}
    </div>
    <text-ellipsis :line="3" hideAction>
      {{ item.briefIntro }}
    </text-ellipsis>
    <slot name="actions" />
  </div>
</template>
<script setup lang="ts">
import type { SkuData } from '@/types';

defineProps<{
  item: SkuData;
}>();
</script>
<style lang="less">
.sku-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 12px;
  width: 170px;
  color: rgba(0, 0, 0, 1);

  > img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    flex-shrink: 0;
  }

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  div {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 16.41px;
  }
}
</style>
