<template>
  <div class="project-header">
    <div class="project-header-row">
      <img alt="avatar" :src="projectInfo?.avatar" />
      <div>
        <div class="detail-header">
          <social-bar
            :website="projectInfo?.website"
            :discord="projectInfo?.discord"
            :twitter="projectInfo?.twitter"
            :instagram="projectInfo?.instagram"
          />
        </div>
        <h3>{{ projectInfo?.projectName }}</h3>
        <div class="project-header-desc">
          <div>
            <div>
              <label>ALTCs:</label>
              <span></span>
            </div>
            <div>
              <label>Collections:</label>
              <span>{{ projectInfo?.rows?.length }}</span>
            </div>
            <div>
              <label>Goods:</label>
              <span>{{ itemCount }}</span>
            </div>
          </div>
          <div>
            <div>
              <label>Provider:</label>
              <span>{{ projectInfo?.provider }}</span>
            </div>
            <div>
              <label>Created:</label>
              <span>{{ dayjs(projectInfo?.createdAt).format('YYYY-MM-DD HH:mm') }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="projectInfo?.images?.length > 0"
      :class="['project-header-poster', { all: showMore }]"
    >
      <div>
        <el-image v-for="item in projectInfo?.images || []" :key="item" :src="item" fit="contain">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
      <div :class="['project-header-poster-more', { up: showMore }]">
        <button @click="handleMore">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            style=""
            filter="none"
          >
            <g>
              <path
                d="M2.016 16c0 7.712 6.272 14.016 13.984 14.016s14.016-6.304 14.016-14.016-6.272-14.016-14.016-14.016-13.984 6.272-13.984 14.016zM16.736 17.28l6.464-6.464c0.288-0.288 0.8-0.288 1.12 0l1.888 1.888c0.288 0.32 0.288 0.832 0 1.12l-9.472 9.472c-0.32 0.32-0.832 0.32-1.12 0l-9.472-9.472c-0.32-0.288-0.32-0.8 0-1.12l1.888-1.888c0.288-0.288 0.8-0.288 1.12 0l6.464 6.464c0.288 0.32 0.8 0.32 1.12 0z"
                fill="rgba(211,217,226,1)"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div class="description">
      <text-ellipsis :line="3" v-if="safeDescription">
        <span v-html="safeDescription"></span>
      </text-ellipsis>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { computed, ref } from 'vue';

import socialBar from '@/components/social-bar/index.vue';
import type { ProjectDetailData } from '@/types';

defineOptions({ name: 'ProjectHeader' });
const props = defineProps<{
  projectInfo: ProjectDetailData;
  itemCount: number;
}>();

const safeDescription = computed(() => {
  const clean = DOMPurify.sanitize(props.projectInfo?.description || '');
  return clean;
});
const showMore = ref(false);
function handleMore() {
  showMore.value = !showMore.value;
}
</script>

<style lang="less" scoped>
.project-header {
  padding: 15px 0px 0;
  font-size: 24px;
  letter-spacing: 0px;
  // line-height: 28px;
  line-height: 1.5;
  font-weight: 400;
  color: #fff;
  font-size: 14px;

  .project-header-row {
    display: flex;
    gap: 26px;
    margin-bottom: 16px;
    > img {
      width: 150px;
      height: 150px;
      flex-shrink: 0;
      border-radius: 10px;
    }
    > div {
      flex-grow: 1;
    }
  }
  .detail-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  h3 {
    font-weight: 700;
    margin-bottom: 16px;
    font-size: 28px;
  }
  p {
    font-size: inherit;
  }
  a {
    font-weight: 400;
    font-size: inherit;
  }

  .project-header-desc {
    flex-grow: 1;
    font-size: 16px;
    line-height: 1.5;
    display: flex;
    gap: 20px;

    > div {
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      label {
        margin-right: 4px;
      }
    }
  }

  .project-header-poster {
    > div:first-child {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 20px;
      row-gap: 20px;
      height: 200px;
      overflow: hidden;
      transition: height ease-in 0.3s;
    }
    :deep(.el-image) {
      padding: 10px;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('./assets/poster-bg.png') center no-repeat;
      background-size: 120% 120%;
      border-radius: 20px !important;
      overflow: hidden;
      > img {
        height: 100%;
      }
    }
    &.all > div:first-child {
      height: auto;
    }
  }
  .project-header-poster-more {
    background: url('./assets/more.png') no-repeat center center;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      width: 200px;
      height: 100%;
      background-color: transparent;
      border-style: none;
      cursor: pointer;
    }
    &.up {
      transform: rotate(180deg);
    }
  }

  .description {
    padding-top: 20px;
  }

  @media screen and (max-width: 800px) {
    .detail-row {
      width: 100%;
      flex-direction: column;
      > img {
        width: 150px;
        height: 150px;
      }
      h3 {
        font-size: 20px;
      }
      p {
        word-wrap: break-word;
      }
    }
  }
}
</style>
