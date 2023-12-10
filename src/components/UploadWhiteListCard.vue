<template>
  <div>
    <upload-dialog-card :visible="visible">
      <template #btnbox>
        <el-button type="primary">Upload</el-button>
      </template>
    </upload-dialog-card>
  </div>
</template>

<script setup lang="ts">
import UploadDialogCard from '@/components/UploadDialogCard.vue';

const props = defineProps(['visible']);
</script>

<style lang="less" scoped></style>
