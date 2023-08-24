<template>
  <div class="project-item" @click="onClick">
    <img
      src="https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png"
      alt=""
    />
    <h3>Farmers World</h3>
    <span>About Farmers</span>
    <el-divider />
    <p>
      Farmers World is the first farming game to function on the NFTs platform. Pick for yourself
      suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the
      fascinating experiences of a farmer working in Farmers World’s Ecosystem.
    </p>
    <div>
      <el-button>Mint</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onClick() {
  router.push('/project/detail')
}
</script>
<style lang="less" scoped>
.project-item {
  width: 264px;
  height: 456px;
  border-radius: 10px;
  background-color: #fff;
  padding: 14px;
  box-sizing: border-box;
  cursor: pointer;
  > img {
    display: block;
    width: 236px;
    // height: 236px;
    border-radius: 10px;
    margin: 0 auto;
  }
  > h3 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
  .el-divider--horizontal {
    margin: 10px 0px;
  }
  > span {
    font-size: 12px;
    line-height: 18px;
    color: #666666;
  }
  > p {
    margin-bottom: 16px;
    font-size: 14px;
    color: #666666;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
  .el-button {
    width: 100%;
    color: #fff;
    background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
  }
}
</style>
