<template>
  <page-container class="pg-project-detail">
    <div class="project-detail">
      <div class="detail-row">
        <div>
          <img alt="avatar" :src="res?.data?.avatar" />
        </div>
        <div class="detail-row-right">
          <div class="detail-header">
            <h3>{{ res?.data?.projectName }}</h3>
            <social-bar :website="res?.data?.website" />
          </div>
          <!-- <a :href="res?.data?.website" target="_blank">{{ res?.data?.website }}</a> -->
          <p>{{ res?.data?.briefIntro }}</p>
          <text-ellipsis>{{ res?.data?.description }}</text-ellipsis>
        </div>
      </div>
    </div>
    <!-- <div class="detail-divider"></div> -->
    <div v-if="res?.data">
      <business-item
        v-for="item in res.data.rows || []"
        :avatar="res.data.avatar"
        :key="item.id"
        :item="item"
        @onDetail="handleDetail(item.id)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';

import { getProjectDetail } from '@/api';
import BusinessItem from '@/components/business-item/index.vue';
import socialBar from '@/components/social-bar/index.vue';

const route = useRoute();
const router = useRouter();
const { id: projectId } = route.params;

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId as string });
  },
});

function handleDetail(bizId: number) {
  router.push(`/project/${projectId}/${bizId}`);
}
</script>
<style lang="less" scoped>
.pg-project-detail {
  .project-detail {
    padding: 15px 30px 0;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0px;
    // line-height: 28px;
    font-weight: 400;

    .detail-row {
      display: flex;
      gap: 26px;
      margin-bottom: 16px;

      .detail-row-right {
        flex-grow: 1;
        overflow: hidden;
        > p {
          margin-bottom: 1em;
        }
      }
      .detail-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      img {
        width: 200px;
        height: 200px;
        // margin-top: -100px;
      }

      h3 {
        font-weight: 500;
        color: #000000;
        margin-bottom: 16px;
        font-size: inherit;
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
  }

  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
