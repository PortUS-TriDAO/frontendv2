<template>
  <main-content>
    <div class="success-box">
      <success-card class="box-top">
        <p>Submit project success！</p>
        <p>Add NFT now</p>
      </success-card>
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
        <p-button @click="handleNext">Next</p-button>
      </div>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';

import SuccessCard from './components/SuccessCard.vue';

const router = useRouter();
const nftType = ref('2');

function handleNext() {
  // sku: 1 spu: 2
  if (nftType.value === '1') {
    router.push('/project/publish/sku');
  } else {
    router.push('/project/publish/spu');
  }
}
</script>

<style lang="less" scoped>
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 88px 50px 50px 50px;
  .box-top {
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
