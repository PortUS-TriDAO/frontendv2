<template>
  <div class="main-width project-header">
    <span class="page-title">Projects</span>
    <div>
      <el-input placeholder="Search Name" :prefix-icon="Search"></el-input>
      <el-button type="primary" @click="createProject">Create Project</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function createProject() {
  router.push('/project/create')
}
</script>
<style lang="less">
.project-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 16px;
  width: 100%;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-input {
      margin-right: 14px;
      width: 200px;
    }
    .el-button {
      width: 150px;
      height: 36px;
    }
  }
}
</style>
