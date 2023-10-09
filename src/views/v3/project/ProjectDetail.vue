<template>
  <page-container class="pg-project-detail" :bannerImg="bannerImg">
    <div class="project-detail">
      <div class="detail-row">
        <img alt="avatar" :src="avatar" />
        <div>
          <h3>Echo of Intensity</h3>
          <a>website</a>
        </div>
      </div>
      <p>
        Dreamed of moonshots but awoke to a capitulation... Welcome to the home of Echo of Intensity
        by Per Kr...
      </p>
    </div>
    <div class="detail-divider"></div>
    <div class="list">
      <div class="item" v-for="project in status.projectList" :key="project.name">
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
            <div>
              <label><strong>Percent for KOL:</strong></label>
              <strong>10%</strong>
            </div>
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

import bannerImg from './assets/banner.png';

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
function handleDetail() {
  console.log('handleNewProject');
}
</script>
<style lang="less" scoped>
.pg-project-detail {
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
  .list {
    .item {
      display: flex;
      flex-direction: row;
      gap: 38px;
      padding: 24px 30px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 20px;
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

      > h3 {
        font-weight: 700;
        font-size: 24px;
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
        strong {
          font-weight: 700;
        }
      }
      .item-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
