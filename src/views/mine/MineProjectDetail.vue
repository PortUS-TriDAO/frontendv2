<template>
  <div class="pg-mime-project-detail">
    <div class="banner">
      <img alt="cover" class="bg" :src="res?.data?.cover" />
      <img alt="avatar" class="avatar" :src="res?.data?.avatar" />
      <!-- <p-button v-if="scenes === 'submitted'" @click="handleEdit">Edit project</p-button> -->
      <p-button v-if="scenesData.topBtn" @click="scenesData.topBtn.onClick">
        {{ scenesData.topBtn.text }}
      </p-button>
    </div>
    <div class="title">commercial contract list</div>
    <div v-if="res?.data">
      <business-item
        v-for="item in res.data.rows || []"
        :key="item.businessId"
        :item="item"
        hideDetail
        @click="handleDetail(item)"
        class="pointer"
      >
        <template v-slot:actions>
          <div>
            <p-button
              v-for="(item, index) in scenesData.rowActions"
              :key="index"
              round
              @click="item.onClick"
            >
              {{ item.text }}
            </p-button>
            <!-- <p-button round @click="handleWithdraw(item)">Withdraw</p-button>
            <p-button round @click="handleSubmit(item)">
              Submit NFT Contract
            </p-button> -->
          </div>
        </template>
      </business-item>
    </div>
    <div class="text-center" v-if="scenesData.buttonBtn">
      <p-button @click="scenesData.buttonBtn.onClick">
        {{ scenesData.buttonBtn.text }}
      </p-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import type { BusinessData } from '@/types';

const route = useRoute();
const router = useRouter();
const { projectId } = route.params;
const scenes = computed(() => route.meta.scenes);

function handleDetail(businessData: BusinessData) {
  router.push(`/mime/${scenes.value}/${projectId}/${businessData.businessId}`);
}

const map = {
  submitted: {
    topBtn: {
      text: 'Edit project',
      onClick: () => {
        // TODO: edit project
      },
    },
    rowActions: [
      {
        text: 'Withdraw',
        onClick: (item: BusinessData) => {
          // TODO: Withdraw
          console.log('handleWithdraw item', item);
        },
      },
      {
        text: 'Submit NFT Contract',
        onClick: (item: BusinessData) => {
          // TODO: Withdraw
          console.log('handleSubmit businessData', item);
        },
      },
    ],
    buttonBtn: {
      text: 'Submit Commercial Contract',
      onClick: () => {
        // TODO: edSubmit Commercial Contract
      },
    },
  },
  participated: {
    topBtn: {
      text: 'Edit project',
      onClick: () => {
        // TODO: edit project
      },
    },
    rowActions: [
      {
        text: 'Withdraw',
        onClick: (item: BusinessData) => {
          // TODO: Withdraw
          console.log('handleWithdraw item', item);
        },
      },
      {
        text: 'Detail',
        onClick: handleDetail,
      },
    ],
    buttonBtn: {
      text: 'Mint More',
      onClick: () => {
        // TODO: Mint More
      },
    },
  },
  store: {
    topBtn: {
      text: 'Edit project',
      onClick: () => {
        // TODO: edit project
      },
    },
    rowActions: [
      {
        text: 'share contract',
        onClick: (item: BusinessData) => {
          // TODO: share contract
          console.log('share contract', item);
        },
      },
    ],
    buttonBtn: null,
  },
};
const scenesData = computed(() => {
  return map[scenes.value || 'submitted'];
});
console.log('projectId=', projectId);

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId as string });
  },
});
console.log('getProjects result=', res);
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
