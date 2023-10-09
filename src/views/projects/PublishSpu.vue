<template>
  <main-content>
    <div class="form-page">
      <div class="form-content">
        <el-form label-width="180px" label-position="top">
          <el-form-item label="Name">
            <el-input placeholder="NFT Name"></el-input>
          </el-form-item>
          <el-form-item label="DDL">
            <el-input placeholder="2023/10/21 11:30"></el-input>
          </el-form-item>
          <el-form-item label="Price">
            <el-input placeholder="Price"></el-input>
          </el-form-item>
          <el-form-item label="Brief introduction">
            <el-input placeholder="12 of 1000 characters used"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input placeholder="12 of 1000 characters used"></el-input>
          </el-form-item>
          <el-form-item label="Quantity">
            <el-input placeholder="the number of SPU.0 represents infinitely many"></el-input>
          </el-form-item>
          <el-form-item label="Seller">
            <el-input disabled placeholder="wallet address"></el-input>
          </el-form-item>
          <el-form-item label="PayToken">
            <el-input disabled placeholder="PayToken"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="uploader-box">
              <uploader></uploader>
              <uploader></uploader>
              <uploader></uploader>
            </div>
            <p>Recommended size: Avatar 200*200 Cover 1200*200 Image 1:1</p>
          </el-form-item>
        </el-form>
      </div>
      <p-button class="btn" @click="handleSave">Save</p-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import Uploader from '@/components/Uploader.vue';
const router = useRouter();

function handleSave() {
  router.push('/project/addnft/success');
}
</script>

<style lang="less" scoped>
.step2-form {
  padding-left: 50px;
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
.uploader-box {
  display: flex;
  flex-direction: row;
}
</style>
