<template>
  <div class="pg-mime-project-detail">
    <project-header :project-info="res?.data" :item-count="res?.data?.rows?.length" />
    <div class="detail-divider"></div>
    <div class="title">List of NFT Goods</div>
    <div class="list">
      <SkuItem
        v-for="item in data || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item)"
        class="pointer"
      >
        <template v-slot:actions v-if="item.isSold === 0">
          <p-button round size="small" @click="handleShareToken(item)"> Share</p-button>
        </template>
      </SkuItem>
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
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import projectHeader from '@/components/project-header/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useProjectSkuSpu } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { BusinessData, SkuSpuData } from '@/types';
import { shareNftDetail } from '@/utils/share';
const route = useRoute();
const router = useRouter();
const { address: account } = getAccount();

const projectId = Number(route.params.projectId);
const scenes = computed(() => route.meta.scenes);
const loading = ref(false);

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

const { data } = useProjectSkuSpu(projectId);

function handleDetail(item: SkuSpuData) {
  if (item.isSku) {
    router.push(`/mine/${scenes.value}/sku/${item.bizId}/${item.id}`);
  } else {
    router.push(`/mine/${scenes.value}/spu/${item.bizId}/${item.id}`);
  }
}

function handleShareToken(item: SkuSpuData) {
  // TODO: handleShareToken
  // 数据列表缺少 item.retailAddress
  // shareNft(account, projectId, item.retailId, item.isSku ? 1 : 2, item.retailAddress, item.bizId);
  shareNftDetail(account, item.retailId, item.bizId, item.id, item.isSku ? 1 : 2);
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
        // TODO: edSubmit Commercial Contract
        router.push(`/project/create/step2/${projectId}`);
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
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }

  .title {
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    color: #000;
    margin: 14px 0;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-between;
    gap: 12px;

    > div {
      cursor: pointer;
    }
  }

  .business-item-detail {
    gap: 18px;
  }
}
</style>
