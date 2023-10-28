<template>
  <div class="page-participated">
    <participated-header-for-kol></participated-header-for-kol>
    <ul>
      <li v-for="item in state.list">
        <project-item :item="item" on-detail="" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';

import * as projectApi from '@/api/projects';
import ProjectItem from '@/components/project-item/index.vue';
import ParticipatedHeaderForKol from '@/views/mine/components/ParticipatedHeaderForKol.vue';

const state = reactive({
  list: [],
});

onMounted(async () => {
  try {
    const { success, data } = await projectApi.getProjects();
    if (!success) {
      ElMessage.error(data as string);
      return;
    }

    state.list = data.rows;
  } catch (e) {
    ElMessage.error('fetch data failed');
  }
});
</script>

<style lang="less" scoped>
.page-participated {
}
</style>
