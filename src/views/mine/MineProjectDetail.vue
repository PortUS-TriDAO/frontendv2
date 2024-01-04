<template>
  <div class="pg-mime-project-detail">
    <project-header :project-info="res?.data" :item-count="res?.data?.rows?.length" />
    <div class="title">Agent license token contract</div>
    <div v-if="res?.data">
      <business-item
        :scenes="scenes"
        v-for="item in res.data.rows || []"
        :key="item.id"
        :item="item"
        hideDetail
        @click="handleDetail(item)"
        @onUploadWhiteList="handleUploadWhiteList"
        @onUploadAirdropList="handleUploadAirdropList"
        class="pointer"
      >
        <template v-slot:actions>
          <div>
            <p-button
              :loading="loading && action.text === 'Withdraw'"
              v-for="(action, index) in scenesData.rowActions"
              :key="index"
              round
              @click="action.onClick(item)"
            >
              {{ action.text }}
            </p-button>
          </div>
        </template>
      </business-item>
    </div>
    <div class="text-center" v-if="scenesData.buttonBtn">
      <p-button @click="scenesData.buttonBtn.onClick">
        {{ scenesData.buttonBtn.text }}
      </p-button>
    </div>
    <upload-white-list-card
      :visible="visible"
      :project-address="res?.creatorAddress"
      :projectId="projectId"
      :bizId="bizId"
      @success="visible = false"
      @close="visible = false"
    ></upload-white-list-card>

    <upload-airdrop-list-card
      :visible="airdropDialogVisible"
      :project-address="res?.creatorAddress"
      :projectId="projectId"
      :bizId="bizId"
      @success="airdropDialogVisible = false"
      @close="airdropDialogVisible = false"
    >
    </upload-airdrop-list-card>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import projectHeader from '@/components/project-header/index.vue';
import UploadAirdropListCard from '@/components/UploadAirdropListCard.vue';
import UploadWhiteListCard from '@/components/UploadWhiteListCard.vue';
import { useProjectStore } from '@/stores/useProject';
import type { BusinessData } from '@/types';

const route = useRoute();
const router = useRouter();

const projectId = Number(route.params.projectId);
const scenes = computed(() => route.meta.scenes);
const loading = ref(false);
const visible = ref(false);
const airdropDialogVisible = ref(false);
const bizId = ref(0);

const projectStore = useProjectStore();

const scenesData = computed(() => {
  return map[scenes.value || 'submitted'];
});

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId.toString() });
  },
});

function handleDetail(businessData: BusinessData) {
  router.push(`/mine/${scenes.value}/${projectId}/${businessData.id}`);
}

function handleUploadWhiteList(businessData: BusinessData) {
  // todo: handleUploadWhiteList
  console.log('todo: handleUploadWhiteList=', businessData);
  visible.value = true;
  bizId.value = businessData.id;
}

function handleUploadAirdropList(businessData: BusinessData) {
  airdropDialogVisible.value = true;
  bizId.value = businessData.id;
}

const map = {
  submitted: {
    topBtn: {
      text: 'Edit project',
      onClick: () => {
        // TODO: edit project
        console.log('mine/MineProjectDetail');
        router.push(`/project/create/step1/${projectId}`);
      },
    },
    rowActions: [
      {
        text: 'Withdraw',
        onClick: async (item: BusinessData) => {
          // 处理项目方withdraw
          console.log('handleWithdraw item', item);
          try {
            loading.value = true;
            const tx = await projectStore.operatorWithdraw(item.contractAddress);
            await waitForTransaction(tx);
          } catch (error) {
            console.log(error);
            ElMessage.error('withdraw failed');
          } finally {
            loading.value = false;
          }
        },
      },
      {
        text: 'Submit NFT Contract',
        onClick: (item: BusinessData) => {
          console.log('handleSubmit businessData', item);
          router.push(`/project/submitsuccess/${projectId}/${item.id}`);
        },
      },
    ],
    buttonBtn: {
      text: 'Setup ALT Contract',
      onClick: () => {
        router.push(`/project/create/deployaltc/${projectId}`);
      },
    },
  },
  participated: {
    topBtn: null,
    rowActions: [
      {
        text: 'Withdraw',
        onClick: async (item: BusinessData) => {
          // TODO: Withdraw KOL withdraw
          console.log('handleWithdraw item', item);
          loading.value = true;
          try {
            const tx = await projectStore.kolWithdraw(item.contractAddress);
            await waitForTransaction(tx);
            ElMessage.success('Withdraw success');
          } catch (error) {
            ElMessage.error('Withdraw failed');
          } finally {
            loading.value = false;
          }
        },
      },
      {
        text: 'Detail',
        onClick: handleDetail,
      },
    ],
    buttonBtn: {
      text: 'Apply More',
      onClick: (item) => {
        console.log('mint more', item);
        // TODO: Mint More
        router.push(`/project/${projectId}`);
      },
    },
  },
  store: {
    topBtn: null,
    rowActions: [
      // {
      //   text: 'share contract',
      //   onClick: (item: BusinessData) => {
      //     // TODO: share contract
      //     console.log('share contract', item);
      //     shareContract(account, projectId, item.id);
      //   },
      // },
    ],
    buttonBtn: null,
  },
};
</script>
<style lang="less" scoped>
.pg-mime-project-detail {
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
