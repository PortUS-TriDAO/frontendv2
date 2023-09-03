<template>
  <div class="mine-container">
    <div class="left-menu">
      <ul>
        <li>
          <router-link to="/project/create">Create Project</router-link>
        </li>
        <li>
          <router-link to="/mine/projects">My Projects</router-link>
        </li>
        <li>
          <router-link to="/mine/distribution">My Distribution</router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.mine-container {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  .left-menu {
    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 217px;
      > li {
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
