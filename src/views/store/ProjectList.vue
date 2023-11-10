<template>
  <page-container class="pg-store-project-list">
    <div>
      <project-item
        v-for="item in res?.data?.rows || []"
        :key="item.projectId"
        :item="item"
        btnText="Project Detail"
        @btnClick="handleDetail"
      >
      </project-item>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

import { getParticipateProjects } from '@/api';
import ProjectItem from '@/components/project-item/index.vue';
import type { Address, ProjectData } from '@/types';

const router = useRouter();
const route = useRoute();

const kolAddress = route.params.kolAddress as Address;

const { data: res, isPending } = useQuery({
  queryKey: ['getParticipateProjects', kolAddress],
  queryFn: () => {
    // storeId
    return getParticipateProjects({ kolAddress });
    // return getProjects({});
  },
});
console.log('getProjects result=', isPending, res);

function handleDetail(item: ProjectData) {
  router.push(`/store/${kolAddress}/project/${item.projectId}`);
}
</script>
<style lang="less" scoped>
.pg-store-project-list {
}
</style>
