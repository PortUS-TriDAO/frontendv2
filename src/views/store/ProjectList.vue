<template>
  <page-container class="pg-store-project-list">
    <div>
      <div class="agent-info">
        <div class="agent-info-left">
          <el-avatar :size="48" :src="agentInfo?.logo || defaultAvatar" />
          <span>{{ agentInfo?.nickName }}</span>
        </div>
        <div class="agent-info-right">
          <social-bar
            :website="agentInfo?.homePage"
            :discord="agentInfo?.discord"
            :twitter="agentInfo?.twitter"
            :instagram="agentInfo?.instagram"
          />
          <el-input v-model="key">
            <template #prefix>
              <el-icon class="el-input__icon">
                <svg
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="SearchIcon"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  ></path>
                </svg>
              </el-icon>
            </template>
          </el-input>
        </div>
      </div>
      <project-item
        v-for="item in list"
        :key="item.projectId"
        :item="item"
        btnText="More"
        @btnClick="handleDetail"
      >
      </project-item>
      <no-data v-if="list.length === 0" />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import type { ElInput } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProjectItem from '@/components/project-item/index.vue';
import socialBar from '@/components/social-bar/index.vue';
import { useParticipateProjects, useProfile } from '@/hooks';
import type { Address, ProjectData } from '@/types';

import defaultAvatar from './assets/avatar.png';

const router = useRouter();
const route = useRoute();
const key = ref('');

const kolAddress = computed(() => route.params.kolAddress as Address);

const { data, isPending } = useParticipateProjects(kolAddress);

const list = computed(() => {
  const value = key.value.trim().toLowerCase();
  if (!value) {
    return data?.value?.rows || [];
  }
  return data?.value?.rows.filter((item) =>
    (item.name || item.projectName).toLowerCase().includes(value),
  );
});

const { data: agentInfo } = useProfile(kolAddress);

console.log('getProjects result=', isPending.value, data);

function handleDetail(item: ProjectData) {
  router.push(`/store/${kolAddress.value}/project/${item.projectId || item.id}`);
}
</script>
<style lang="less" scoped>
.pg-store-project-list {
  .agent-info {
    height: 150px;
    display: flex;
    align-items: center;
    :deep(.el-avatar) {
      flex-shrink: 0;
    }
    .agent-info-left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 14px;
    }
    .agent-info-right {
      display: flex;
      align-items: center;
      gap: 20px;
      :deep(.social-bar) {
        gap: 20px;
      }
      :deep(.el-input__wrapper) {
        border: solid 4px #636b80;
        background-color: #6c7488;
        border-radius: 10px;
        box-shadow: none;
        width: 300px;
      }
      :deep(.el-input__inner) {
        height: 40px;
        color: #101010;
      }
      :deep(.el-input__icon) {
        font-size: 24px;
        color: #2c394f;
        svg {
          width: 1em;
          height: 1em;
          display: inline-block;
          fill: currentColor;
        }
      }
    }
  }
}
</style>
