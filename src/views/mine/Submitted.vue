<template>
  <div class="page-mine-content">
    <h3 class="mine-page-title">ProjectList</h3>
    <project-list-item></project-list-item>
    <project-list-item></project-list-item>
    <project-list-item></project-list-item>
    <project-list-item></project-list-item>
    <project-list-item></project-list-item>
  </div>
</template>

<script lang="ts" setup>
import ProjectListItem from './components/ProjectListItem.vue';
</script>

<style lang="less">
.page-mine-content {
  margin-left: 30px;
  margin-right: 30px;

  .mine-page-title {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 26px;
  }
}
</style>
