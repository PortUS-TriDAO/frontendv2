<template>
  <div class="page-mine-submitted">
    <h3 v-if="scenesData.title" class="mine-page-title">{{ scenesData.title }}</h3>
    <project-item
      v-for="item in data?.rows || []"
      :key="item.projectId"
      :item="item"
      :btnText="scenesData.btnText"
      @btnClick="scenesData.btnClick"
      @click="handleDetail(item)"
      class="pointer"
    >
    </project-item>
    <div class="text-center" v-if="scenesData.bottomBtn">
      <p-button @click="scenesData.bottomBtn.onClick">{{ scenesData.bottomBtn.text }}</p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProjectItem from '@/components/project-item/index.vue';
import { useParticipateProjects, useProjects, useSubmittedProjects } from '@/hooks';
import type { ProjectData } from '@/types';
import { shareProject, shareStore } from '@/utils/share';

defineOptions({ name: 'MimeProjectList' });
const router = useRouter();
const route = useRoute();
const scenes = computed(() => route.meta.scenes);
const { data, refetch, isPending } = useProjects();

const { address: account } = getAccount();

function handleDetail(item: ProjectData) {
  router.push(`/mine/${scenes.value}/${item.projectId}`);
}

const map = {
  submitted: {
    title: 'ProjectList',
    btnText: 'Edit',
    btnClick: (item: ProjectData) => {
      console.log('handleEdit item', item);
      // TODO: edit
      router.push(`/project/create/step1/${item.projectId}`);
    },
    bottomBtn: {
      text: 'Create Project',
      onClick: () => {
        router.push('/project/create/step1');
      },
    },
  },
  participated: {
    title: 'participated projects list',
    btnText: '',
    btnClick: handleDetail,
    bottomBtn: {
      text: 'Mint More',
      onClick: () => {
        // TODO: Mint More
        router.push('/project/list');
      },
    },
  },
  store: {
    title: '',
    btnText: 'Share Project',
    btnClick: () => {
      // TODO: edit
      shareProject(account);
    },
    bottomBtn: {
      text: 'share My Store',
      onClick: () => {
        // TODO: share My Store
        shareStore(account);
      },
    },
  },
};

const scenesData = computed(() => {
  return map[scenes.value || 'submitted'];
});
</script>

<style lang="less">
.page-mine-submitted {
  .mine-page-title {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 26px;
  }
}
</style>
