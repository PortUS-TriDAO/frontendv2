<template>
  <div class="pg-mime-project-detail">
    <div class="banner">
      <img alt="cover" class="bg" :src="res?.data?.cover" />
      <img alt="avatar" class="avatar" :src="res?.data?.avatar" />
      <p-button @click="handleEdit">Edit project</p-button>
    </div>
    <div class="title">commercial contract list</div>
    <div v-if="res?.data">
      <business-item
        v-for="item in res.data.rows || []"
        :key="item.businessId"
        :item="item"
        hideDetail
        @click="handleDetail"
        class="pointer"
      >
        <template v-slot:actions>
          <div>
            <p-button round @click="handleWithdraw(item)">Withdraw</p-button>
            <p-button round @click="handleSubmit(item)">Submit NFT Contract</p-button>
          </div>
        </template>
      </business-item>
    </div>
    <div class="text-center">
      <p-button @click="handleCreate">Submit Commercial Contract</p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import type { BusinessData } from '@/types';

// import avatar from '@/assets/images/demo-avatar.png';
// import bannerImg from './assets/banner.png';

const route = useRoute();
const router = useRouter();
const { projectId } = route.params;
console.log('projectId=', projectId);

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId as string });
  },
});
console.log('getProjects result=', res);

function handleEdit() {
  // TODO: edit project
}
function handleWithdraw(businessData: BusinessData) {
  console.log('handleWithdraw businessData', businessData);
  // TODO: Submit Contract
}
function handleSubmit(businessData: BusinessData) {
  console.log('handleSubmit businessData', businessData);
  // TODO: Submit Contract
}
function handleCreate() {
  // TODO: Submit Contract
}
function handleDetail(businessData: BusinessData) {
  router.push(`/mime/submitted/${projectId}/${businessData.businessId}`);
}
</script>
<style lang="less" scoped>
.pg-mime-project-detail {
  .banner {
    height: 200px;
    overflow: hidden;
    background-color: rgb(4, 1, 14);
    display: flex;
    justify-content: center;
    margin-top: -20px;
    margin-left: -30px;
    margin-right: -30px;
    position: relative;

    .bg {
      width: 100%;
      height: 200px;
    }
    .avatar {
      position: absolute;
      width: 150px;
      height: 150px;
      top: 25px;
      left: 30px;
      z-index: 2;
    }
    > button {
      position: absolute;
      right: 30px;
      bottom: 20px;
      z-index: 2;
    }
  }
  .title {
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    color: #000;
    margin: 14px 0;
  }
  .business-item-detail {
    gap: 18px;
  }
}
</style>
