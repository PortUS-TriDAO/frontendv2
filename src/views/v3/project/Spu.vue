<template>
  <page-container class="pg-spu-detail" :bannerImg="data?.cover" showBanner>
    <div class="sku-detail">
      <div class="detail-row">
        <img alt="avatar" :src="data?.avatar" />
        <div>
          <h3>Echo of Intensity</h3>
          <div class="flex-between">
            <div style="width: 50%">{{ data?.price }} USDT</div>
            <div style="width: 50%">{{ dayjs(data?.ddl * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
        </div>
      </div>
      <div class="description">
        <div>
          {{ data?.briefIntro }}
        </div>
        <text-ellipsis>
          {{ data?.description }}
        </text-ellipsis>
      </div>
    </div>
    <!-- <div class="detail-divider"></div> -->
    <!-- <div class="list">
      <div class="item">
        <div class="item-detail">
          <h3>Echo of Intensity</h3>
          <p>Dreamed of moonshots but awoke to a capitulation.</p>
          <div class="item-row2">
            <div>
              <label>items:</label>
              <span>136</span>
            </div>
            <div>
              <label>Applied/Total:</label>
              <span>56/200</span>
            </div>
          </div>
          <div class="item-action">
            <div>
              <label><strong>Commission rate:</strong></label>
              <strong>10%</strong>
            </div>
            <p-button @click="handleDetail('1231313123')">Detail</p-button>
          </div>
        </div>
      </div>
    </div> -->
  </page-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import avatar from '@/assets/images/demo-avatar.png';
import { useSpuDetail } from '@/hooks';

import bannerImg from './assets/banner.png';

const route = useRoute();
const router = useRouter();

const spuId = computed(() => Number(route.params.spuId));

const { data } = useSpuDetail(spuId);

function handleDetail(businessId: string) {
  const { id } = route.params;
  router.push(`/project/${id}/${businessId}`);
}
</script>
<style lang="less" scoped>
.pg-spu-detail {
  .sku-detail {
    padding: 15px 30px 0;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 28px;
    font-weight: 400;

    .detail-row {
      display: flex;
      gap: 26px;
      margin-bottom: 16px;

      > img {
        width: 200px;
        height: 200px;
        margin-top: -100px;
      }
      > div {
        flex: 1;
      }
      h3 {
        font-weight: 700;
        color: #000000;
        margin-bottom: 16px;
        font-size: inherit;
      }
      p {
        font-size: inherit;
      }
      a {
        font-weight: 400;
        font-size: inherit;
      }
    }
  }
  .description {
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    color: #000000;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
  }
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  .list {
    .item {
      display: flex;
      flex-direction: row;
      gap: 38px;
      padding: 24px 30px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .item-detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
      font-size: 24px;
      letter-spacing: 0px;
      line-height: 29px;
      color: #000000;

      > h3 {
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
      .item-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
