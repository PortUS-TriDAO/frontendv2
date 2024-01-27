<template>
  <page-container class="pg-project-list">
    <div class="searchbar">
      <el-input v-model="searchKey" placeholder="Search Name" class="search-input" />
      <p-button @click="refetch">Search</p-button>
      <!-- <p-button @click="handleSubmit">Create Project</p-button> -->
    </div>
    <div>
      <project-item
        v-for="item in res?.data?.rows || []"
        :key="item.projectId"
        :item="item"
        btnText="See more"
        @btnClick="handleDetail"
      >
      </project-item>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :total="res?.data?.totalPage * 10"
        class="mt-4"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { getProjects } from '@/api';
import ProjectItem from '@/components/project-item/index.vue';
import type { ProjectData } from '@/types';

const searchKey = ref('');
const router = useRouter();
const page = ref(1);

const {
  data: res,
  refetch,
  isPending,
} = useQuery({
  queryKey: ['getProjects', searchKey.value, page],
  queryFn: () => {
    return getProjects({ key: searchKey.value, page: page.value, limit: 10 });
  },
});

function handleDetail(item: ProjectData) {
  router.push(`/project/${item.projectId}`);
}

function handleSubmit() {
  router.push('/project/create/step1');
}

function handlePageChange(currentPage: number) {
  console.log('page===', currentPage);
  page.value = currentPage;
}
</script>
<style lang="less" scoped>
.pg-project-list {
  .searchbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
    padding-top: 28px;
    padding-bottom: 20px;

    .search-input {
      width: 270px;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
