<template>
  <main-content>
    <div class="step1-form">
      <div class="form-content">
        <el-form label-position="top" label-width="100px">
          <el-form-item label="Project Name">
            <el-input placeholder="Party A name"></el-input>
          </el-form-item>
          <el-form-item label="Brief introduction">
            <el-input placeholder="100 characters used"></el-input>
          </el-form-item>
          <el-form-item label="Website">
            <el-input placeholder="https:// or http://"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input placeholder="12 or 1000 characters used"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="uploads">
              <uploader @onSuccess="handleAvatar">
                <span>Avatar</span>
              </uploader>
              <uploader @onSuccess="handleCover">
                <span>Cover</span>
              </uploader>
            </div>
            <p>Recommended size: Avatar 200*200 Cover 1200*200</p>
          </el-form-item>
        </el-form>
      </div>
      <p-button class="btn" @click="handleNext">NEXT</p-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import Uploader from '@/components/Uploader.vue';

const router = useRouter();
async function handleNext() {
  console.log('handleNext');
  router.push('/project/create/step2');
}

const handleAvatar = (url: String) => {
  console.log('handleAvatar', url);
};

async function handleCover(url: String) {
  console.log('handleCover', url);
}
</script>

<style lang="less" scoped>
.step1-form {
  .form-content {
    width: 658px;
    margin-top: 20px;
  }
  :deep(.el-form-item__label) {
    margin-top: 16px;
    font-size: 20px;
  }
  .btn {
    border-radius: 67px;
    float: right;
  }
  .uploads {
    display: flex;
    flex-direction: row;
  }
}
</style>
