<template>
  <page-container class="pg-project-list">
    <div class="searchbar">
      <el-input v-model="searchKey" placeholder="Search Name" class="search-input" />
      <p-button @click="searchProjects">Search</p-button>
    </div>
    <div>
      <project-item
        v-for="item in pageData.rows"
        :key="item.projectId"
        :item="item"
        @onDetail="handleDetail"
      >
      </project-item>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getProjects } from '@/api';
import ProjectItem from '@/components/project-item/index.vue';
import type { PageData, ProjectData } from '@/types';

const searchKey = ref('');
const router = useRouter();
const pageData = reactive<PageData<ProjectData>>({
  rows: [],
  currentPage: 1,
  total: 0,
});

const searchProjects = async () => {
  const { success, data } = await getProjects({ key: searchKey });
  console.log('data=', data);
  if (success) {
    pageData.currentPage = data.currentPage;
    pageData.total = data.total;
    pageData.rows = data.rows;
  }
};
onMounted(searchProjects);

function handleDetail(item: ProjectData) {
  router.push(`/project/${item.projectId}`);
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
}
</style>
