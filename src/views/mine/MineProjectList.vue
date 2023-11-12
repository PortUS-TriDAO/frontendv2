<template>
  <div class="page-mine-submitted">
    <h3 v-if="scenesData.title" class="mine-page-title">{{ scenesData.title }}</h3>
    <project-item
      v-for="item in data?.rows || []"
      :key="item.id || item.projectId"
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

    <share-dialog
      @close="shareDialogVisible = false"
      :visible="shareDialogVisible"
      :share-url="shareUrl"
    ></share-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { computed, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProjectItem from '@/components/project-item/index.vue';
import ShareDialog from '@/components/ShareDialog.vue';
import { useScenesProjects } from '@/hooks';
import type { ProjectData } from '@/types';
import { shareProject, shareStore } from '@/utils/share';

defineOptions({ name: 'MimeProjectList' });
const router = useRouter();
const route = useRoute();
const scenes = computed(() => route.meta.scenes);
const shareDialogVisible = ref(false);
const shareUrl = ref('');

const { data } = useScenesProjects(scenes);
const { address: account } = getAccount();

function handleDetail(item: ProjectData) {
  router.push(`/mine/${scenes.value}/${item.id || item.projectId}`);
}

const map = {
  submitted: {
    title: 'ProjectList',
    btnText: 'Edit',
    btnClick: (item: ProjectData) => {
      console.log('handleEdit item', item);
      // TODO: edit
      router.push(`/project/create/step1/${item.id || item.projectId}`);
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
    btnText: 'Project Detail',
    btnClick: handleDetail,
    bottomBtn: {
      text: 'Apply More',
      onClick: () => {
        // TODO: Mint More
        router.push('/project/list');
      },
    },
  },
  store: {
    title: '',
    btnText: 'Project Detail',
    btnClick: handleDetail,
    // btnText: 'Share Project',
    // btnClick: (item: ProjectItem) => {
    //   // TODO: edit
    //   const projectInfo = toRaw(item);
    //   shareProject(account, projectInfo.projectId);
    // },
    bottomBtn: {
      text: 'share My Store',
      onClick: () => {
        // TODO: share My Store
        const url = shareStore(account);

        // dialog share
        // shareDialogVisible.value = true;
        // shareUrl.value = url;
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
