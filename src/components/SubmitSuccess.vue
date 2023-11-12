<template>
  <main-content>
    <div class="success-box">
      <success-card class="box-top">
        <p>ALTC created success！</p>
        <p>Contract Binding</p>
      </success-card>
      <div class="box-middle">
        <div class="box-left">
          <p>NFT Address</p>
          <el-input placeholder="NFT Address" v-model="nftAddress"></el-input>
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
        <p-wallet-button @click="handleNext" :loading="loading">Confirm</p-wallet-button>
      </div>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { useBusinessDetail } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';

import SuccessCard from '../views/projects/components/SuccessCard.vue';

const projectStore = useProjectStore();
const router = useRouter();
const nftType = ref('1');
const nftAddress = ref('');
const route = useRoute();
const projectId = route.params.projectId;
const bizId = route.params.bizId as string;

const loading = ref(false);

const { data: bizDetail } = useBusinessDetail(bizId);

function handleNext() {
  if (!nftAddress.value || nftAddress.value.length !== 42) {
    ElMessage.error('Please input nft address');
    return;
  }
  // sku: 1 spu: 2
  if (nftType.value === '1') {
    // minted NFT. 获取NFT的metadata
    deployMintedContract();
  } else {
    // unmint NFT
    deployUnMintedContract();
  }
}

async function deployMintedContract() {
  if (!projectId || typeof projectId !== 'string') {
    ElMessage.error('Project address not in rooter');
    return;
  }
  loading.value = true;
  try {
    const {
      success,
      data,
      contractAddress: retailAddress,
    } = await projectStore.deployMintedNftContract(
      projectId,
      nftAddress.value,
      bizDetail.value.contractAddress!,
      bizId,
    );
    if (!success) throw new Error('deploy minted contract failed');
    router.push(
      `/project/publish/sku/${projectId}/${bizId}/${nftAddress.value}/${retailAddress}/${data.retailId}`,
    );
  } catch (error) {
    console.error('create minted failed', error);
    ElMessage.error('create minted retailer failed');
  } finally {
    loading.value = false;
  }
}

async function deployUnMintedContract() {
  if (!projectId || typeof projectId !== 'string') {
    ElMessage.error('Project address not in rooter');
    return;
  }

  loading.value = true;
  try {
    const {
      success,
      data,
      contractAddress: retailAddress,
    } = await projectStore.deployUnmintedNftContract(
      projectId,
      nftAddress.value,
      bizDetail.value.contractAddress,
      bizId,
    );
    if (!success) throw new Error(data);
    router.push(
      `/project/publish/spu/${projectId}/${bizId}/${nftAddress.value}/${retailAddress}/${data.retailId}`,
    );
  } catch (error) {
    console.error('create unminted', error);
    ElMessage.error('create unminted retrieve failed');
  } finally {
    loading.value = false;
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
