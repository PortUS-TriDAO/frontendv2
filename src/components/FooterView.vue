<template>
  <div class="page-footer">
    <div class="footer-container">
      <div class="logo"></div>
      <div class="footer-right">
        <span class="social">
          <a href="https://twitter.com/PortUS_DeCPS" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/social-x.png" width="16px" height="14px" />
            <span>@PortUS_DeCPS</span>
          </a>
          <a href="https://t.co/lippmVY1t1" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/social-discord.png" width="18px" height="14px" />
            <span>@PortUS_DeCPS</span>
          </a>
          <a href="mailto:info@tridao.xyz">
            <img src="@/assets/images/social-email.png" width="17px" height="13px" />
            <span>info@tridao.xyz</span>
          </a>
          <a target="_blank" rel="noopener noreferrer"> Legal disclaimer </a>
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
    height: 66px;
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
    .footer-right {
      display: inline-flex;
      align-items: center;
    }
    .social {
      display: inline-flex;
      align-items: center;
      gap: 20px;
      > a {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #fff;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 800px) {
    padding: 20px 16px;
    height: auto;
    .footer-container {
      justify-content: flex-start;
      padding: 0;
      height: auto;

      .logo {
        height: 24px;
        width: 90px;
      }
      // > div {
      //   margin-top: 15px;
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      // }
      .footer-right {
        display: none;
      }
    }
  }
}
</style>
