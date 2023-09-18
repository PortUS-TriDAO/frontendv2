<template>
  <div class="mine-container">
    <div class="left-menu">
      <ul>
        <li>
          <router-link class="create-project-btn" to="/project/create">Create Project</router-link>
        </li>
        <li>
          <i class="icon-myproject"></i>
          <router-link to="/mine/projects">My Projects</router-link>
        </li>
        <li>
          <i class="icon-mydistribution"></i>
          <router-link to="/mine/distribution">My Distribution</router-link>
        </li>
      </ul>
    </div>
    <div class="mine-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.mine-container {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  box-sizing: border-box;
  .left-menu {
    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 210px;
      margin-right: 17px;
      > li {
        height: 40px;
        margin-bottom: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        .create-project-btn {
          width: 200px;
          line-height: 40px;
          display: inline-block;
          text-align: center;
          border-radius: 6px;
          color: #fff;
          background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
        }
        > i {
          display: inline-block;
          width: 21px;
          height: 21px;
          margin-right: 14px;
          &.icon-myproject {
            background: url('@/assets/images/icon-myproject.png') center center no-repeat;
            background-size: contain;
          }
          &.icon-mydistribution {
            background: url('@/assets/images/icon-mydistribution.png') center center no-repeat;
            background-size: contain;
          }
        }
        > a {
          color: #999999;
        }
      }
    }
  }
  .mine-content {
    flex: 1;
    width: 976px;
  }
}
</style>
