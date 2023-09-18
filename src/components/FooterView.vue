<template>
  <div class="page-footer">
    <div class="footer-container">
      <div class="logo"></div>
      <div>
        <!-- <span>List of services that we’re using to calculate data:</span> -->
        <span> © 2023 PortUS </span>
        <span class="icons">
          <a href="https://twitter.com/PortUS_DeCPS" target="_blank" class="icon-twitter"></a>
          <a href="https://t.co/lippmVY1t1" target="_blank" class="icon-discord"></a>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
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
    .icons {
      display: inline-block;
      > a {
        display: inline-block;
        width: 25px;
        line-height: 25px;
        margin-right: 10px;
      }
      .icon-discord {
        background: url('@/assets/images/icon-discord.png') center center no-repeat;
        background-size: contain;
        width: 25px;
        height: 25px;
      }
      .icon-twitter {
        background: url('@/assets/images/icon-footer-twitter.png') center center no-repeat;
        background-size: contain;
        width: 25px;
        height: 25px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    padding-top: 30px;
    padding-bottom: 30px;
    height: auto;
    .footer-container {
      flex-direction: column;
      justify-content: center;
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
