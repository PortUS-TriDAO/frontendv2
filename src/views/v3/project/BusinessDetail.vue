<template>
  <page-container class="pg-business-detail">
    <div class="business-detail">
      <div class="business-title">
        <h2>Echo of Intensity</h2>
        <h2>
          <strong>Percent for KOL</strong>
          <span>20%</span>
        </h2>
      </div>
      <p>Dreamed of moonshots but awoke to a capitulation.</p>
      <div class="business-mint">
        <label>righted/rights:</label>
        <span>56/200</span>
        <p-button @click="handleMint">Mint</p-button>
      </div>
      <div>
        <span>1.2 USDT</span>
      </div>
      <p>
        Welcome to the home of Echo of Intensity by Per Kristian Stoveland on OpenSea. Discover the
        best items in this collection.
      </p>
    </div>
    <div class="detail-divider"></div>
    <div class="list">
      <div class="list-title">NFT contract list</div>
      <div class="item" v-for="project in status.projectList" :key="project.name">
        <img alt="avatar" :src="avatar" />
        <div class="item-detail">
          <div>0x121212</div>
          <div>989</div>
          <div class="item-action">
            <div></div>
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

function handleMint() {
  console.log('handleMint...');
}
function handleDetail() {
  console.log('handleDetail...');
}
</script>
<style lang="less" scoped>
.pg-business-detail {
  .business-detail {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
    padding: 20px 28px 0 28px;
  }

  .business-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h2 {
      height: 40px;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 40px;
      color: #000000;
      text-align: center;
      vertical-align: top;
      > strong {
        font-weight: 900;
        margin-right: 19px;
      }
      > span {
        font-weight: 900;
        color: rgba(250, 101, 41, 1);
      }
    }
  }
  .business-mint {
    position: relative;
    > button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  .list {
    .list-title {
      height: 29px;
      font-size: 24px;
      font-weight: 400;
      line-height: 28px;
      color: #000000;
      margin-bottom: 12px;
      padding-left: 28px;
    }
    .item {
      display: flex;
      flex-direction: row;
      gap: 12px;
      padding: 10px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 20px;
      > img {
        width: 150px;
        height: 150px;
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
      padding-top: 10px;

      .item-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
