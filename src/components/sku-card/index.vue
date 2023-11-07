<template>
  <div
    :class="[
      'sku-card',
      {
        'sku-card--small': size === 'small',
      },
    ]"
  >
    <div class="detail-card">
      <img alt="avatar" :src="item.avatar" />
      <div class="card-desc">
        <!--TODO: name <h3>{{ item.nftName }}</h3> -->
        <div>#{{ item.tokenId }}</div>
        <div>{{ item.price }} USDT</div>
        <div>
          {{ item.ddl ? dayjs(item.ddl * 1000).format('YYYY-MM-DD HH:mm') : '' }}
        </div>
      </div>
      <div class="card-action">
        <!--TODO: sold out <div v-if="item.isSalesEnd" class="sold-out">sold out</div> -->
        <!-- <p-button @click="buy(item)">Buy</p-button> -->
        <slot></slot>
        <!-- <slot name="actions"></slot> -->
      </div>
    </div>
    <text-ellipsis v-if="item.briefIntro">
      {{ item.briefIntro }}
    </text-ellipsis>
    <text-ellipsis v-if="item.description">
      {{ item.description }}
    </text-ellipsis>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';

import type { SkuData } from '@/types';

defineOptions({ name: 'SkuItem' });
defineProps<{ item: SkuData; size?: 'small' }>();
const emit = defineEmits(['buy']);

function buy(item: SkuData) {
  emit('buy', item);
}
</script>
<style lang="less">
.sku-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #000;
  font-size: 24px;
  line-height: 28px;
  font-weight: 400;

  .detail-card {
    display: flex;
    gap: 26px;
    background: #f7f7f7;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 18px;

    > img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      flex-shrink: 0;
    }

    .card-desc {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-top: 10px;
    }

    h3 {
      font-weight: 700;
      color: #000000;
      font-size: inherit;
    }

    div {
      font-size: inherit;
    }
  }

  p {
    font-size: 24px;
    font-weight: 400;
  }

  .card-action {
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .sold-out {
    width: 130px;
    height: 90px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #fff;
  }

  &.sku-card--small {
    .detail-card > img {
      width: 100px;
      height: 100px;
    }

    .detail-card .card-desc {
      gap: 10px;
    }
  }
}
</style>
