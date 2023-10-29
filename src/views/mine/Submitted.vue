<template>
  <div class="page-mine-submitted">
    <h3 class="mine-page-title">ProjectList</h3>
    <project-item
      v-for="item in res?.data?.rows || []"
      :key="item.projectId"
      :item="item"
      btnText="Edit"
      @btnClick="handleEdit"
      @click="handleDetail(item)"
      style="cursor: pointer"
    >
    </project-item>
    <div class="action-center">
      <p-button @click="handleCreate">Create Project</p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { getProjects } from '@/api';
import ProjectItem from '@/components/project-item/index.vue';
import type { ProjectData } from '@/types';

const searchKey = ref('');
const router = useRouter();

const {
  data: res,
  refetch,
  isPending,
} = useQuery({
  queryKey: ['getProjects'],
  queryFn: () => {
    return getProjects({ key: searchKey.value });
  },
});
console.log('getProjects result=', isPending, res);

function handleEdit(item: ProjectData) {
  // TODO: edit
  router.push('/project/create/step1');
}

function handleDetail(item: ProjectData) {
  router.push(`/mine/project/${item.projectId}`);
}

function handleCreate() {
  router.push('/project/create/step1');
}
</script>

<style lang="less">
.page-mine-submitted {
  .mine-page-title {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 26px;
  }
  .action-center {
    text-align: center;
  }
}
</style>
