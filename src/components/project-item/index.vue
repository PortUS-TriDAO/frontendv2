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
            <label>Provider:</label>
            <span>{{ item.provider }}</span>
          </div>
          <div class="text-2-row">
            <label>Project intro:</label>
            <span>{{ item.briefIntro }}</span>
          </div>
        </div>
        <div>
          <div>
            <label>ALTCs:</label>
            <span></span>
          </div>
          <div>
            <label>Collections:</label>
            <span>{{ item.collectionCount }}</span>
          </div>
          <div>
            <label>Goods:</label>
            <span>{{ item.goodsCount }}</span>
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
import type { ProjectData } from '@/types';

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
}
</style>
