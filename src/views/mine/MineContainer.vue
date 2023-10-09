<template>
  <div class="mine-container">
    <div class="left-menu">
      <ul>
        <li>
          <router-link :class="['create-project-btn', 'selected']" to="/mine/submitted"
            >Submitted</router-link
          >
        </li>
        <li>
          <router-link to="/mine/participated">Participated</router-link>
        </li>
        <li>
          <router-link to="/mine/store">Store</router-link>
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
    background-color: #fff;
    padding: 18px;
    margin-right: 5px;
    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      margin-right: 17px;

      > li {
        height: 30px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        > a {
          color: #999999;
          font-size: 16px;
          font-weight: 600;
          &.selected {
            color: #f62d10;
          }
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
