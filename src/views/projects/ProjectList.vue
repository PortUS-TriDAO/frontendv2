<template>
  <div class="main-width page-project-list">
    <content-header></content-header>

    <div class="item-list-box">
      <ul>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
        <li>
          <project-item></project-item>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProjectItem from '@/components/ProjectItem.vue'
import ContentHeader from '@/components/ContentHeader.vue'
</script>
<style lang="less">
.page-project-list {
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  .project-list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 16px;
    > div {
      display: flex;
      flex-direction: row;
      .el-input {
        margin-right: 14px;
      }
    }
  }
  .item-list-box {
    width: 1400px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      > li {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0px;
        }
      }
    }
  }
}
</style>
