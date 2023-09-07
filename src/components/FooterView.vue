<template>
  <div class="page-footer">
    <div class="footer-container">
      <div class="logo"></div>
      <div>
        <span>List of services that we’re using to calculate data:</span>
        <span> © 2018-2023 DappRadar, UAB </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.page-footer {
  background: #000425;
  height: 160px;
  color: #fff;
  .footer-container {
    width: 1400px;
    line-height: 160px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 145px;
      height: 43px;
      background: url('@/assets/footer-logo.png') center center no-repeat;
      background-size: contain;
    }
    span {
      color: #fff;
      opacity: 0.8;
      margin-left: 24px;
    }
  }
}
</style>
