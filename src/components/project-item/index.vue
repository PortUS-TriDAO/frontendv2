<template>
  <div class="project-item">
    <div class="project-item-avatar">
      <img alt="avatar" :src="item.avatar" />
    </div>
    <div class="project-item-detail">
      <h3>{{ item.name || item.projectName }}</h3>
      <div class="project-item-desc">
        Project intro: {{ item.briefIntro }}
        <!-- <text-ellipsis :line="2" hideAction>Project intro: {{ item.briefIntro }}</text-ellipsis> -->
      </div>
      <!-- <div class="item-row2">
            <div>
              <label>items:</label>
              <span>136</span>
            </div>
            <div>
              <label>righted/rights:</label>
              <span>56/200</span>
            </div>
          </div>-->
      <!-- <div style="flex-grow: 1"></div> -->
    </div>
    <div class="item-action">
      <p-button v-if="btnText" @click="handleClick(item)">
        {{ btnText || 'See more' }}
      </p-button>
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
  gap: 38px;
  padding: 24px 30px;
  // background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 20px;
  background: url('@/assets/images/item-bg.png');
  background-size: 100% 100%;
  // height: 258px;
  // width: 913px;

  .project-item-avatar {
    background-color: #fff;
    // border: 1px solid rgba(187, 187, 187, 1);
    padding: 8px;
    border-radius: 10px;
    flex-shrink: 0;
    > img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }
  }

  .project-item-detail {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 29px;
    color: #000000;
    padding: 14px 10px 10px 0;

    > h3 {
      font-weight: 700;
      font-size: inherit;
    }

    > p {
      font-size: inherit;
      font-weight: 400;
    }

    // .item-row2 {
    //   display: flex;
    //   flex-direction: row;
    //   align-items: center;
    //   label {
    //     margin-right: 4px;
    //   }
    //   div:first-child {
    //     width: 245px;
    //   }
    // }
  }
  .item-action {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 16px;
  }

  .project-item-desc {
    font-size: 20px;
  }
}
</style>
