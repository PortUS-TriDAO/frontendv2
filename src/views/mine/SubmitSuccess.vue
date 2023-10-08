<template>
  <main-content>
    <div class="success-box">
      <div class="box-top">
        <i class="icon-success"></i>
        <p>Submit project success！</p>
        <p>Add NFT now</p>
      </div>
      <div class="box-middle">
        <div class="box-left">
          <p>NFT Address</p>
          <el-input placeholder="NFT Address"></el-input>
        </div>
        <div class="box-right">
          <p>The type of the NFT</p>
          <el-radio-group v-model="nftType" fill="#000000" text-color="#000000">
            <el-radio label="1">Minted NFT</el-radio>
            <el-radio label="2">Unmint NFT</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="box-bottom">
        <span>or You can add NFT later in Mine- project- commercial</span>
        <p-button>Next</p-button>
      </div>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import MainContent from '@/components/MainContent.vue';

const nftType = ref('1');
</script>

<style lang="less" scoped>
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 88px 50px 50px 50px;
  .box-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-success {
      display: block;
      width: 167px;
      height: 140px;
      background: url('@/assets/images/icon-success.png') center center no-repeat;
      background-size: contain;
    }
    > p {
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      line-height: 50px;
    }
  }
  .box-middle {
    margin-top: 109px;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    .box-left {
      .el-input {
        width: 450px;
      }
    }
    p {
      margin-bottom: 12px;
    }
  }
  .box-bottom {
    margin-top: 133px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
