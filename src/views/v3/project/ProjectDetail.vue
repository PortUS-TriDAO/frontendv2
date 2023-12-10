<template>
  <page-container class="pg-project-detail">
    <project-header :project-info="res?.data" :item-count="res?.data?.rows?.length" />
    <div class="detail-divider"></div>
    <div class="list-title">ALTC list</div>
    <div v-if="res?.data">
      <business-item
        v-for="item in res.data.rows || []"
        :avatar="res.data.avatar"
        :key="item.id"
        :item="item"
        @onDetail="handleDetail(item.id)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import projectHeader from '@/components/project-header/index.vue';
import socialBar from '@/components/social-bar/index.vue';

const route = useRoute();
const router = useRouter();
const { id: projectId } = route.params;

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId as string });
  },
});

function handleDetail(bizId: number) {
  router.push(`/project/${projectId}/${bizId}`);
}
</script>
<style lang="less" scoped>
.pg-project-detail {
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  .list-title {
    font-size: 20px;
    font-weight: 500;
    margin: 20px 0;
  }
}
</style>
