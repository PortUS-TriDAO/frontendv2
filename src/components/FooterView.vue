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
  color: #fff;
  .footer-container {
    width: var(--container-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    // line-height: 160px;
    height: 160px;
    line-height: 1.5;
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
  @media screen and (max-width: 800px) {
    padding-top: 30px;
    padding-bottom: 30px;
    height: auto;
    .footer-container {
      flex-direction: column;
      .logo {
        margin-top: 0;
      }
      > div {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
