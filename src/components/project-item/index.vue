<template>
  <div class="project-item">
    <div class="project-item-avatar">
      <img alt="avatar" :src="item.avatar" />
    </div>
    <div class="project-item-detail">
      <h3>{{ item.name || item.projectName }}</h3>
      <div class="project-item-desc">
        <div>
          <div>
            <label>ProjectName:</label>
            <span>{{ item.projectName }}</span>
          </div>
          <div>
            <label>Provider:</label>
            <span class="provider">{{ item.provider }}</span>
          </div>
          <div class="text-2-row">
            <!-- <label></label> -->
            <span>{{ item.briefIntro }}</span>
          </div>
        </div>
        <div>
          <div v-if="item.altcs && scenes !== 'store' && !isStorePage">
            <label>ALTCS:</label>
            <span>{{ item.altcs }}</span>
          </div>
          <div v-if="item.collectionCount">
            <label>Collections:</label>
            <span>{{ item.collectionCount }}</span>
          </div>
          <div v-if="item.goodsCount">
            <label>Goods:</label>
            <span>{{ item.goodsCount }}</span>
          </div>
          <div v-if="item.createdAt">
            <label>Created:</label>
            <span>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
      </div>
      <div class="project-item-action">
        <p-button v-if="btnText" @click="handleClick(item)">
          {{ btnText || 'More' }}
        </p-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { ProjectData } from '@/types';
const route = useRoute();

const scenes = computed(() => route.meta.scenes);
const isStorePage = computed(() => route.path.slice(0, 6) === '/store');

defineOptions({ name: 'ProjectItem' });
defineProps<{ item: ProjectData; btnText?: string }>();
const emit = defineEmits(['btnClick']);
function handleClick(item: ProjectData) {
  emit('btnClick', item);
}
</script>
<style lang="less">
.project-item {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 15px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  background: url('./assets/item-bg.png');
  background-size: 100% 100%;
  min-height: 250px;
  overflow: hidden;

  .project-item-avatar {
    border: solid 1px rgba(229, 229, 229, 1);
    padding: 8px;
    border-radius: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    > img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
  }

  .project-item-detail {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 29px;

    > h3 {
      font-size: 28px;
      font-weight: 700;
      font-size: inherit;
    }

    > p {
      font-size: inherit;
      font-weight: 400;
    }
  }

  .project-item-desc {
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
      .provider {
        display: inline-block;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        width: 100px;
      }
    }
  }
  .text-2-row {
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    white-space: normal;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .project-item-action {
    flex-shrink: 0;
    text-align: center;
  }
  @media (max-width: 768px) {
    min-height: auto;
    padding: 12px 12px 20px;
    gap: 10px;
    .project-item-avatar {
      padding: 0;
      border: none;
      > img {
        width: 100px;
        height: 100px;
      }
    }
    .project-item-detail {
      position: relative;
      gap: 8px;
      font-size: 12px;
      > h3 {
        font-size: 16px;
      }
    }
    .project-item-desc {
      flex-wrap: wrap;
      font-size: 12px;
      gap: 8px;
      > div {
        width: 100%;
        .provider {
          width: 100%;
        }
      }
    }
    .project-item-action {
      position: absolute;
      bottom: 0;
      right: 0;
      > button {
        min-width: auto;
        width: 80px;
        height: 20px;
        padding: 12px;
        font-size: 12px;
      }
    }
  }
}
</style>
