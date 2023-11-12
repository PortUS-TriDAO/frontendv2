<template>
  <div class="pg-mime-project-detail">
    <div class="banner">
      <img alt="cover" class="bg" :src="res?.data?.cover" />
      <!-- <img alt="avatar" class="avatar" :src="res?.data?.avatar" /> -->
    </div>
    <div class="project-detail">
      <div class="detail-row">
        <img alt="avatar" :src="res?.data?.avatar" />
        <div>
          <h3>{{ res?.data?.projectName }}</h3>
          <a :href="res?.data?.website" target="_blank">{{ res?.data?.website }}</a>
        </div>
      </div>
      <p style="margin-bottom: 20px">{{ res?.data?.briefIntro }}</p>
      <text-ellipsis>{{ res?.data?.description }}</text-ellipsis>
    </div>
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
        <template v-slot:actions>
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
import SkuItem from '@/components/sku-item/index.vue';
import { useProjectSkuSpu } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';
import type { BusinessData, SkuSpuData } from '@/types';
import { shareNft } from '@/utils/share';
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
  shareNft(account, projectId, item.retailId, item.isSku ? 1 : 2, item.retailAddress, item.bizId);
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
  .banner {
    height: 200px;
    overflow: hidden;
    background-color: rgb(4, 1, 14);
    display: flex;
    justify-content: center;
    margin-top: -20px;
    margin-left: -30px;
    margin-right: -30px;
    // position: relative;

    .bg {
      width: 100%;
      height: 200px;
    }

    // .avatar {
    //   position: absolute;
    //   width: 150px;
    //   height: 150px;
    //   top: 25px;
    //   left: 30px;
    //   z-index: 2;
    // }

    > button {
      position: absolute;
      right: 30px;
      bottom: 20px;
      z-index: 2;
    }
  }

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

  .project-detail {
    padding: 15px 30px 0;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 28px;
    font-weight: 400;
    z-index: 222;

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

  .business-item-detail {
    gap: 18px;
  }
}
</style>
