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
        <w-button @click="handleNext" :loading="loading">Next</w-button>
      </div>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { useProjectStore } from '@/stores/useProject';

// import { useDeployerContractStore } from '@/stores/useDeployerContract';
import SuccessCard from '../views/projects/components/SuccessCard.vue';

// const deployerContract = useDeployerContractStore();
const projectStore = useProjectStore();
const router = useRouter();
const nftType = ref('2');
const nftAddress = ref('0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964');
const route = useRoute();
const projectId = route.params.projectId;

const loading = ref(false);

function handleNext() {
  if (!nftAddress.value || nftAddress.value.length !== 42) {
    ElMessage.error('Please input nft address');
    return;
  }
  // sku: 1 spu: 2
  if (nftType.value === '1') {
    // minted NFT. 获取NFT的metadata
    // deployMintedContract();
    router.push(`/project/publish/sku`);
  } else {
    // unmint NFT
    // deployUnMintedContract();
    router.push(`/project/publish/spu`);
  }
}

async function deployMintedContract() {
  console.log('deployMintedContract', {
    nftAddress: nftAddress.value,
    nftType: nftType.value,
  });
  if (!projectId || typeof projectId !== 'string') {
    ElMessage.error('Project address not in rooter');
    return;
  }
  loading.value = true;
  try {
    const { success, data, contractAddress } = await projectStore.deployMintedNftContract(
      projectId,
      nftAddress.value,
    );
    if (!success) throw new Error(data);
    router.push(`/project/publish/sku/${projectId}/${contractAddress}`);
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
    const { success, data, contractAddress } = await projectStore.deployUnmintedNftContract(
      projectId,
      nftAddress.value,
    );
    if (!success) throw new Error(data);
    router.push(`/project/publish/spu/${projectId}/${contractAddress}`);
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
