<template>
  <div class="main-width page-project-detail">
    <img :src="state.banner" alt="" />
    <div class="project-info">
      <div class="info-detail">
        <img :src="state.icon" alt="" />
        <div class="project-info-detail">
          <h3>{{ state.name }}</h3>
          <span>Stephen Enzo</span>
          <p>{{ state.briefIntro }}</p>
        </div>
      </div>
      <div class="mint-detail">
        <span v-if="state.maxSupply === 0">+∞</span>
        <span v-else>Percent : {{ (state.totalSupply / state.maxSupply).toFixed(2) }} %</span>
        <el-button v-if="account" :loading="loading" class="mint-btn" @click="handleMint"
          >Mint</el-button
        >
        <el-button v-else class="mint-btn" @click="connectWallet">Connect Wallet</el-button>
      </div>
    </div>
    <el-divider />
    <p class="project-desc">
      {{ state.description }}
    </p>

    <div class="swiper">
      <el-carousel trigger="click" height="219px">
        <el-carousel-item v-for="item in 1" :key="item">
          <div class="swiper-item-box">
            <img
              width="329"
              height="219"
              v-for="item in state.screenShots"
              :key="item"
              :src="item"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getProjectDetail, postProjectMint } from '@/api';
import { getAccount, waitForTransaction } from '@wagmi/core';
import { getProjectContractFunctions } from '@/stores/useContract';
import { useWalletStore } from '@/stores/useWallet';
import { ElMessage } from 'element-plus';
import type { Address } from '@/types';
const { referrerSign } = getProjectContractFunctions();
const route = useRoute();
const walletStore = useWalletStore();
const loading = ref(false);
const account = computed(() => walletStore.state.account);
interface IState {
  banner: string;
  icon: string;
  name: string;
  briefIntro: string;
  description: string;
  projectAddress: Address;
  maxSupply: number;
  totalSupply: number;
  screenShots: string[];
}

let state: IState = reactive({
  banner: '',
  icon: '',
  name: '',
  briefIntro: '',
  description: '',
  projectAddress: '0x',
  maxSupply: 0,
  totalSupply: 0,
  screenShots: [],
});

onMounted(async () => {
  const id = route.params.id;
  const result = await getProjectDetail({ id });
  console.log({ result });
  if (result.success) {
    const { data } = result;
    state.banner = data.banner;
    state.icon = data.icon;
    state.name = data.name;
    state.description = data.description;
    state.screenShots = data.screenShots;
    state.projectAddress = data.projectAddress;
    state.maxSupply = data.maxSupply;
    state.totalSupply = data.totalSupply;
  }
});

async function handleMint() {
  try {
    const id = route.params.id;
    loading.value = true;
    const { address } = getAccount();
    const { hash } = await referrerSign(state.projectAddress);
    await waitForTransaction({ hash });
    await postProjectMint({
      projectId: id,
      account: address,
    });
    ElMessage.success('Mint Success');
  } catch (error) {
    ElMessage.error('Mint failed');
  } finally {
    loading.value = false;
  }
}

function connectWallet() {
  walletStore.connect();
}
</script>
<style lang="less" scoped>
.page-project-detail {
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 70px;
  @banner-width: 100%;
  > img {
    position: relative;
    width: 100%;
    height: @banner-width / 2;
    max-height: 300px;
    border-radius: 10px;
    overflow-x: hidden;
  }
  .project-info {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // align-items: flex-start;
    align-items: center;
    .info-detail {
      > img {
        width: 160px;
        height: 160px;
        border-radius: 10px;
        margin-right: 24px;
      }
      .project-info-detail {
        position: relative;
        width: 100%;
        > h3 {
          font-size: 28px;
          font-weight: bold;
          line-height: 150%;
          margin-bottom: 9px;
        }
        > span {
          font-size: 20px;
          font-weight: 500;
          line-height: 150%;
          color: #333333;
        }
        > p {
          font-size: 16px;
          font-weight: normal;
          line-height: 150%;
          color: #666;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
    .mint-detail {
      display: flex;
      flex-direction: column;
      > span {
        font-size: 28px;
        font-weight: 700;
        line-height: 42px;
      }
      .mint-btn {
        color: #fff;
        width: 220px;
        height: 65px;
        border-radius: 12px;
        font-size: 22px;
        font-weight: 500;
        background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
      }
    }
  }
  .project-desc {
    margin-top: 40px;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  .swiper {
    margin-top: 30px;
    height: 219px;
    .swiper-item-box {
      display: flex;
      flex: 1;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      > img {
        width: 329px;
        height: 219px;
        border-radius: 10px;
        margin: 0 10px;
      }
    }
  }
}
</style>
