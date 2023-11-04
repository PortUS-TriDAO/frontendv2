<template>
  <page-container class="pg-store-project-detail" :bannerImg="res?.data?.cover">
    <div class="project-detail">
      <div class="detail-row">
        <img alt="avatar" :src="res?.data?.avatar" />
        <div>
          <h3>{{ res?.data?.projectName }}</h3>
          <a :href="res?.data?.website" target="_blank">website</a>
        </div>
      </div>
      <text-ellipsis>{{ res?.data?.briefIntro }}</text-ellipsis>
      <text-ellipsis>{{ res?.data?.description }}</text-ellipsis>
    </div>
    <div class="detail-divider"></div>
    <div v-if="res?.data">
      <business-item
        v-for="item in res.data.rows || []"
        :avatar="res.data.avatar"
        :key="item.bizId"
        :item="item"
        btnText="Contract Detail"
        @onDetail="handleDetail"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import type { BusinessData } from '@/types';

const route = useRoute();
const router = useRouter();
const storeId = computed(() => route.params.storeId);
const projectId = computed(() => route.params.projectId);

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId.value as string });
  },
});
console.log('getProjects result=', res);

function handleDetail(businessData: BusinessData) {
  router.push(`/store/${storeId.value}/project/${projectId.value}/${businessData.bizId}`);
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
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
