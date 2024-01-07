<template>
  <div :class="['sku-item', { sold: item.isSold || item.isHide }]">
    <div class="sku-item-amount">{{ item.soldAmount }}/{{ item.sellAmount }}</div>
    <el-image :src="item.avatar || item.imgUrl" fit="contain">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <h3>{{ item?.name || item?.nftName }}#{{ item?.tokenId }}</h3>
    <div>{{ item.price }} {{ PayTokenMap[item.payToken]?.symbol || 'USDT' }}</div>
    <div class="sku-item-action">
      <slot name="actions" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue';

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
  align-items: center;
  gap: 12px;
  padding: 16px 12px;
  background: #f7f7f7;
  border-radius: 20px;
  margin-bottom: 12px;
  width: 200px;
  color: #fff;
  position: relative;
  padding-bottom: 62px;
  background: url('./assets/bg.png') center center no-repeat;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  background-size: 120% 120%;

  &.sold {
    position: relative;
    background-color: rgba(63, 58, 58, 1);
    img,
    button {
      opacity: 0.5 !important;
    }
  }
  .sku-item-amount {
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 2;
    font-size: 24px;
  }

  .el-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .image-slot {
      font-size: 32px;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    white-space: normal;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  div {
    font-size: 20px;
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
  .sku-item-action {
    height: 50px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    > button {
      width: 100% !important;
      height: 50px;
      border-radius: 0px 0px 20px 20px !important;
      background: linear-gradient(
        90.06deg,
        rgba(251, 114, 47, 1) -1.7%,
        rgba(226, 0, 0, 1) 77.7%
      ) !important;
      font-size: 24px;
      color: #fff !important;
    }
  }
}
</style>
