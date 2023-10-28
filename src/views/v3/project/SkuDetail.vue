<template>
  <page-container class="pg-sku-detail">
    <div class="project-detail">
      <div class="detail-row">
        <img alt="avatar" :src="avatar" />
        <div class="detail-row-desc">
          <h3>{{ data?.nftName }}</h3>
          <div>#{{ data?.tokenId }}</div>
          <div>{{ data?.price }} USDT</div>
          <div>
            {{ data?.deadline ? dayjs(data.deadline * 1000).format('YYYY-MM-DD HH:mm') : '' }}
          </div>
        </div>
      </div>
      <text-ellipsis>
        {{ data?.briefIntro }}
      </text-ellipsis>
      <text-ellipsis>
        {{ data?.description }}
      </text-ellipsis>
    </div>
    <div class="detail-divider"></div>
    <div class="list-title">Items</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.tokenId"
        :item="item"
        @click="handleDetail(item.tokenId)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';

import SkuItem from '@/components/sku-item/index.vue';
import { useNftList, useSkuDetail } from '@/hooks';

const route = useRoute();
const router = useRouter();
const { nftAddress, tokenId } = route.params;

const { data } = useSkuDetail(tokenId as string);
const { data: nftList } = useNftList(nftAddress as string);

import avatar from '@/assets/images/demo-avatar.png';

function handleDetail(tokenId: number) {
  router.push(`/nft/${nftAddress}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-sku-detail {
  .project-detail {
    padding: 15px 30px 0;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 28px;
    font-weight: 400;

    .detail-row {
      display: flex;
      gap: 26px;
      background: #f7f7f7;
      padding: 10px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 18px;

      > img {
        width: 200px;
        height: 200px;
      }
      .detail-row-desc {
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
      p {
        font-size: inherit;
      }
    }
  }
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  .list-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
    margin: 0 0 14px 0;
  }
  .list {
    display: flex;
    flex-direction: row;
    gap: 12px;
    > div {
      cursor: pointer;
    }
  }
}
</style>
