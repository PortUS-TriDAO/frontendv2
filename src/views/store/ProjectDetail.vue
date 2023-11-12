<template>
  <page-container class="pg-store-project-detail" :bannerImg="res?.data?.cover" showBanner>
    <div class="project-detail">
      <div class="detail-row">
        <img alt="avatar" :src="res?.data?.avatar" />
        <div>
          <h3>{{ res?.data?.projectName }}</h3>
          <a :href="res?.data?.website" target="_blank">{{ res?.data?.website }}</a>
        </div>
      </div>
      <p>{{ res?.data?.briefIntro }}</p>
      <text-ellipsis>{{ res?.data?.description }}</text-ellipsis>
    </div>
    <div class="detail-divider"></div>
    <div class="list-title">List of NFT Goods</div>
    <div v-if="data" class="list">
      <SkuItem
        v-for="item in data || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item)"
        class="pointer"
      >
        <!-- <template v-slot:actions>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end">
            <p-button
              v-if="!(item.isSold || item.isHide)"
              :loading="loading"
              size="small"
              round
              v-on:click="handleBuy(item)"
            >
              Buy Now
            </p-button>
          </div>
        </template> -->
      </SkuItem>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import SkuItem from '@/components/sku-item/index.vue';
import { useProjectSkuSpu } from '@/hooks';
// import BusinessItem from '@/components/business-item/index.vue';
import type { Address, SkuSpuData } from '@/types';

const route = useRoute();
const router = useRouter();
const kolAddress = route.params.kolAddress as Address;
const projectId = Number(route.params.projectId);

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId.toString() });
  },
});

const { data } = useProjectSkuSpu(projectId);
console.log('getProjects result=', data);

function handleDetail(item: SkuSpuData) {
  if (item.isSku) {
    router.push(`/store/${kolAddress}/sku/${item.retailId}/${item.id}/${item.bizId}`);
  } else {
    router.push(`/store/${kolAddress}/spu/${item.retailId}/${item.id}/${item.bizId}`);
  }
}
</script>
<style lang="less" scoped>
.pg-store-project-detail {
  .project-detail {
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
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
