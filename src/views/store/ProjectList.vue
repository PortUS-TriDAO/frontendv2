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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getProjects } from '@/api';
import ProjectItem from '@/components/project-item/index.vue';
import type { ProjectData } from '@/types';

const router = useRouter();
const route = useRoute();

const storeId = computed(() => route.params.storeId);

const {
  data: res,
  refetch,
  isPending,
} = useQuery({
  queryKey: ['getProjects'],
  queryFn: () => {
    // storeId
    return getProjects({ key: '' });
  },
});
console.log('getProjects result=', isPending, res);

function handleDetail(item: ProjectData) {
  router.push(`/store/${storeId.value}/project/${item.projectId}`);
}
</script>
<style lang="less" scoped>
.pg-store-project-list {
}
</style>
