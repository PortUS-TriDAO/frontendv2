<template>
  <page-container class="mine-container" :background-image="bg">
    <div class="left-menu">
      <div>
        <router-link
          :class="['create-project-btn', { selected: selected === 'submitted' }]"
          to="/mine/submitted"
        >
          <el-icon><Connection /></el-icon>
          Project Created
        </router-link>
        <router-link
          :class="['create-project-btn', { selected: selected === 'participated' }]"
          to="/mine/participated"
        >
          <el-icon><Collection /></el-icon>
          Participated
        </router-link>
        <router-link
          :class="['create-project-btn', { selected: selected === 'store' }]"
          to="/mine/store"
        >
          <el-icon><ShoppingTrolley /></el-icon>
          My Store
        </router-link>
        <router-link
          :class="['create-project-btn', { selected: selected === 'profile' }]"
          to="/mine/profile"
        >
          <el-icon><Avatar /></el-icon>
          Profile
        </router-link>
      </div>
    </div>
    <div class="mine-content">
      <router-view></router-view>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { Avatar, Collection, Connection, ShoppingTrolley } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import bg from './assets/mine-bg.png';

const route = useRoute();
console.log('route:', route);

const selected = computed(() => route.meta.scenes);
</script>
<style lang="less">
.mine-container {
  > article {
    display: flex;
    flex-direction: row;
  }

  .left-menu {
    padding: 18px;
    margin-right: 5px;
    border-right: 1px solid rgba(187, 187, 187, 1);

    > div {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;

      > a {
        cursor: pointer;
        display: flex;

        height: 44px;
        width: 180px;
        padding-left: 8px;
        color: #999999;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 4px;

        &.selected {
          color: #f62d10;
          background-color: #00245a;
        }
        > .el-icon {
          font-size: 18px;
        }
      }
    }
    @media (max-width: 800px) {
      display: none;
    }
  }

  .mine-content {
    flex: 1;
    width: 800px;
    padding: 20px 30px;
  }
  @media (max-width: 800px) {
    .mine-content {
      padding: 0;
    }
  }
}
</style>
