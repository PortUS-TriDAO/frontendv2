<template>
  <div class="main-width project-header">
    <span class="page-title">My Projects</span>
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
<style lang="less"></style>
