<template>
  <div class="main-width page-project-list">
    <content-header></content-header>

    <div class="item-list-box">
      <ul>
        <li v-for="project in status.projectList" :key="project.name">
          <project-item :data="project"></project-item>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ProjectItem, { type IProps as IProjectItemProps } from '@/components/ProjectItem.vue';
import ContentHeader from '@/components/ContentHeader.vue';
import { queryAllProjects } from '@/api';

const status = reactive({
  projectList: [],
  currentPage: 1,
  totalPage: 20,
});

interface IResponse {
  success: boolean;
  data: {
    currentPage: number;
    totalPage: number;
    rows: IProjectItemProps[];
  };
}

onMounted(async () => {
  const { success, data } = (await queryAllProjects({})) as IResponse;
  if (success) {
    status.currentPage = data.currentPage;
    status.totalPage = data.totalPage;
    status.projectList = data.rows;
  }
});
</script>
<style lang="less" scoped>
.page-project-list {
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  width: 1200px;
  .project-list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 16px;
    > div {
      display: flex;
      flex-direction: row;
      .el-input {
        margin-right: 14px;
      }
    }
  }
  .item-list-box {
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      > li {
        margin-right: 17px;
        margin-bottom: 19px;
        &:nth-child(5n) {
          margin-right: 0px;
        }
      }
    }
  }
}
</style>
