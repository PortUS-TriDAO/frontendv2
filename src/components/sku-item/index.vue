<template>
  <div class="sku-item">
    <div class="icon">
      <img alt="avatar" :src="item.avatar || item.imgUrl" />
    </div>
    <h3>{{ item?.name || item?.nftName }}</h3>
    <div>{{ item.price }} {{ PayTokenMap[item.payToken]?.symbol || 'USDT' }}</div>
    <text-ellipsis :line="3" hideAction>
      {{ item.briefIntro }}
    </text-ellipsis>
    <slot name="actions" />
    <div v-if="item.isSold" class="sold-out">sold out</div>
  </div>
</template>
<script setup lang="ts">
import { PayTokenMap } from '@/constant/contracts';
import type { SkuData, SpuData } from '@/types';

defineOptions({
  name: 'SkuItem',
});
defineProps<{
  item: SkuData | SpuData;
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
  position: relative;
  .icon {
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    > img {
      width: 100%;
    }
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

  .sold-out {
    width: 100%;
    line-height: 60px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    // font-size: 16px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    border-radius: 10px;
  }
}
</style>
