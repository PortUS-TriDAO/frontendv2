<template>
  <div class="project-header">
    <div class="detail-row">
      <img alt="avatar" :src="projectInfo?.avatar" />
      <div class="detail-row-right">
        <div class="detail-header">
          <h3>{{ projectInfo?.projectName }}</h3>
          <social-bar
            :website="projectInfo?.website"
            :discord="projectInfo?.discord"
            :twitter="projectInfo?.twitter"
            :instagram="projectInfo?.instagram"
          />
        </div>
        <p style="margin-bottom: 1em">{{ projectInfo?.briefIntro }}</p>
        <text-ellipsis>{{ projectInfo?.description }}</text-ellipsis>
        <div class="detail-item">
          <div>Items: {{ itemCount }}</div>
          <div>Created: {{ dayjs(projectInfo?.createdAt).format('YYYY-MM-DD HH:mm') }}</div>
          <div>Chain: Ethereum</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';

import socialBar from '@/components/social-bar/index.vue';
import type { ProjectDetailData } from '@/types';

defineOptions({ name: 'ProjectHeader' });
defineProps<{
  projectInfo: ProjectDetailData;
  itemCount: number;
}>();
</script>

<style lang="less" scoped>
.project-header {
  padding: 15px 0px 0;
  font-size: 24px;
  letter-spacing: 0px;
  // line-height: 28px;
  line-height: 1.5;
  font-weight: 400;
  color: rgba(94, 94, 94, 1);
  font-size: 14px;

  .detail-row {
    display: flex;
    gap: 26px;
    margin-bottom: 16px;

    > img {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      background-color: #eee;
      border-radius: 10px;

      // margin-top: -100px;
    }
    h3 {
      font-weight: 700;
      color: #000000;
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
  }

  .detail-row-right {
    flex-grow: 1;
    overflow: hidden;
  }
  .detail-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .detail-item {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    > div {
      position: relative;
      &::after {
        position: absolute;
        text-align: center;
        content: '·';
        right: 0;
        top: 50%;
        transform: translate(100%, -50%);
        width: 16px;
      }
      &:last-child::after {
        display: none;
      }
    }
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
    // .detail-header {
    //   flex-direction: column-reverse;
    //   gap: 16px;
    // }
  }
}
</style>
