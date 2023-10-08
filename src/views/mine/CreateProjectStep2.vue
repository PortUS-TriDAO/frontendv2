<template>
  <main-content>
    <div class="step2-form">
      <div class="form-content">
        <el-form label-width="180px" label-position="top">
          <el-form-item label="Name">
            <el-input placeholder="commercial contract name"></el-input>
          </el-form-item>
          <el-form-item label="Percent">
            <el-input placeholder="Percent for KOL"></el-input>
          </el-form-item>
          <el-form-item label="Brief introduction">
            <el-input placeholder="100 characters used"></el-input>
          </el-form-item>
          <el-form-item label="Pay token">
            <el-input placeholder="Pay token"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input placeholder="description"></el-input>
          </el-form-item>
          <el-form-item label="Right quantity">
            <el-input placeholder="Right quantity"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p-button class="btn" @click="handleSubmit">submit</p-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';

const router = useRouter();

function handleSubmit() {
  router.push('/project/submitsuccess');
}
</script>

<style lang="less" scoped>
.step2-form {
  .form-content {
    width: 658px;
    :deep(.el-form-item__label) {
      margin-top: 16px;
      font-size: 20px;
    }
  }
  .btn {
    float: right;
  }
}
</style>
