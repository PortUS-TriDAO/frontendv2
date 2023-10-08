<template>
  <page-container class="pg-project-list">
    <div class="searchbar">
      <el-input v-model="searchKey" placeholder="Search Name" class="search-input">
        <!-- <template #append><el-button :icon="Search" @click="handleSearch" /></template> -->
      </el-input>
      <p-button @click="handleSearch">Search</p-button>
    </div>
    <div class="list">
      <div class="item" v-for="project in status.projectList" :key="project.name">
        <img alt="avatar" :src="avatar" />
        <div class="item-detail">
          <h3>Echo of Intensity</h3>
          <p>Dreamed of moonshots but awoke to a capitulation.</p>
          <div class="item-row2">
            <div>
              <label>items:</label>
              <span>136</span>
            </div>
            <div>
              <label>righted/rights:</label>
              <span>56/200</span>
            </div>
          </div>
          <div class="item-action">
            <p-button @click="handleDetail">Detail</p-button>
          </div>
        </div>
      </div>
    </div>
  </page-container>
</template>
<script setup lang="ts">
// import { Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';

import { getProjects } from '@/api';
import avatar from '@/assets/images/demo-avatar.png';
import ProjectItem, { type IProps as IProjectItemProps } from '@/components/ProjectItem.vue';

const searchKey = ref('');

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
  const { success, data } = (await getProjects({})) as IResponse;
  if (success) {
    status.currentPage = data.currentPage;
    status.totalPage = data.totalPage;
    status.projectList = data.rows;
  }
});

function handleSearch() {
  console.log('search, key=', searchKey.value);
}
function handleNewProject() {
  console.log('handleNewProject');
}
</script>
<style lang="less" scoped>
.pg-project-list {
  // display: flex;
  // flex-direction: column;
  // width: var(--container-width);
  // background: #ffffff;
  // padding-left: 30px;
  // padding-right: 30px;
  // padding-bottom: 30px;
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
  .list {
    .item {
      display: flex;
      flex-direction: row;
      gap: 38px;
      padding: 10px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 20px;
      > img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        flex-shrink: 0;
      }
    }
    .item-detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
      font-size: 24px;
      letter-spacing: 0px;
      line-height: 29px;
      color: #000000;
      padding-top: 14px;
      padding-right: 10px;
      > h3 {
        font-weight: 700;
      }
      > p {
        font-weight: 400;
      }
      .item-row2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        label {
          margin-right: 4px;
        }
        div:first-child {
          width: 245px;
        }
      }
      .item-action {
        text-align: right;
      }
    }
  }
}
</style>
