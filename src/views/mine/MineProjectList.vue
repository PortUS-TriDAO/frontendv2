<template>
  <div class="page-mine-submitted">
    <!-- <h3 v-if="scenesData.title" class="mine-page-title">{{ scenesData.title }}</h3> -->
    <div class="page-list-header">
      <h5>Projects</h5>
      <p-button @click="scenesData.bottomBtn.onClick">{{ scenesData.bottomBtn.text }}</p-button>
    </div>
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
    <no-data v-if="data?.rows?.length < 1" />
    <div class="pagination">
      <el-pagination
        background
        @current-change="handlePageChange"
        layout="prev, pager, next"
        :pageCount="data?.totalPage"
        class="mt-4"
      />
    </div>
    <!-- <div class="text-center" v-if="scenesData.bottomBtn">
      <p-button @click="scenesData.bottomBtn.onClick">{{ scenesData.bottomBtn.text }}</p-button>
    </div> -->

    <share-dialog
      @close="shareDialogVisible = false"
      :visible="shareDialogVisible"
      :share-url="shareUrl"
    ></share-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProjectItem from '@/components/project-item/index.vue';
import ShareDialog from '@/components/ShareDialog.vue';
import { useScenesProjects } from '@/hooks';
import type { ProjectData } from '@/types';
import { shareStore } from '@/utils/share';

import ProjectListHeader from './components/ProjectListHeader.vue';

defineOptions({ name: 'MimeProjectList' });
const router = useRouter();
const route = useRoute();
const scenes = computed(() => route.meta.scenes);
const shareDialogVisible = ref(false);
const shareUrl = ref('');
const page = ref(1);

const { data } = useScenesProjects(scenes, page.value);
const { address: account } = getAccount();

function handleDetail(item: ProjectData) {
  if (scenes.value === 'store') {
    const { address } = getAccount();
    // router.push(`/store/${address}/project/${item.id}`);
    const resolveData = router.resolve(`/store/${address}/project/${item.id}`);
    window.open(resolveData.href, '_blank');
  } else {
    router.push(`/mine/${scenes.value}/${item.id || item.projectId}`);
  }
}

const handlePageChange = (currentPage: number) => {
  page.value = currentPage;
};

const map = {
  submitted: {
    title: 'ProjectList',
    btnText: 'Edit',
    headerBtnText: 'Create Project',
    headerBtnClick: () => {},
    btnClick: (item: ProjectData) => {
      console.log('handleEdit item', item);
      // TODO: edit
      router.push(`/project/create/step1/${item.id || item.projectId}`);
    },
    bottomBtn: ['www.portus.world', 'portus.world'].includes(location.host)
      ? null
      : {
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
      text: 'Share My Store',
      onClick: () => {
        // TODO: share My Store
        const url = shareStore(account);
        shareDialogVisible.value = true;
        shareUrl.value = url;

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
  .page-list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    > h5 {
      font-size: 30px;
    }
  }
}
</style>
