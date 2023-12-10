<template>
  <main-content>
    <!--    <div class="success-box">-->
    <!--      <success-card class="box-top">-->
    <!--        <p>ALTC created success！</p>-->
    <!--        <p>Contract Binding</p>-->
    <!--      </success-card>-->
    <!--      <div class="box-middle">-->
    <!--        <div class="box-left">-->
    <!--          <p>NFT Address</p>-->
    <!--          <el-input placeholder="NFT Address" v-model="nftAddress"></el-input>-->
    <!--        </div>-->
    <!--        <div class="box-right">-->
    <!--          <p>The type of the NFT</p>-->
    <!--          <el-radio-group v-model="deployType" fill="#000000" text-color="#000000">-->
    <!--            <el-radio label="1">Minted NFT</el-radio>-->
    <!--            <el-radio label="2">Unmint NFT</el-radio>-->
    <!--          </el-radio-group>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="box-bottom">-->
    <!--        <span>or You can add NFT later in Mine- project- commercial</span>-->
    <!--        <p-wallet-button @click="handleNext" :loading="loading">Confirm</p-wallet-button>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="success-box">
      <h5>Submit project success! Add NFT now</h5>
      <div class="row-box">
        <h6>The standard of the NFT</h6>
        <el-radio-group v-model="nftType" fill="#000000" text-color="#000000">
          <el-radio label="0">ERC721</el-radio>
          <el-radio label="1">ERC1155</el-radio>
        </el-radio-group>
      </div>
      <div class="row-box">
        <h6>The type of the NFT</h6>
        <el-radio-group v-model="deployType" fill="#000000" text-color="#000000">
          <el-radio label="1">Minted NFT</el-radio>
          <el-radio label="2">Unmint NFT</el-radio>
        </el-radio-group>
      </div>
      <div class="row-box">
        <h6>Contract Type</h6>
        <el-input placeholder="NFT Address" v-model="nftAddress"></el-input>
      </div>
      <div class="box-bottom">
        <span>or You can add NFT later in My Profile</span>
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
const deployType = ref('1');
const nftAddress = ref('');
const route = useRoute();
const projectId = route.params.projectId;
const bizId = route.params.bizId as string;
const nftType = ref('0');

const loading = ref(false);

const { data: bizDetail } = useBusinessDetail(bizId);

function handleNext() {
  if (!nftAddress.value || nftAddress.value.length !== 42) {
    ElMessage.error('Please input nft address');
    return;
  }
  // sku: 1 spu: 2
  if (deployType.value === '1') {
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
      Number(nftType.value),
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
      nftType.value,
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
  justify-content: center;
  padding: 43px;

  .row-box {
    width: 544px;
    margin-top: 51px;

    > h6 {
      font-size: 32px;
      margin-bottom: 10px;
    }
  }

  .box-bottom {
    margin-top: 51px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 544px;

    > span {
    }
  }

  h5 {
    font-size: 40px;
  }

  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //padding: 88px 50px 50px 50px;
  //
  //.box-top {
  //  > p {
  //    font-size: 30px;
  //    font-weight: 700;
  //    text-align: center;
  //    line-height: 50px;
  //  }
  //}
  //
  //.box-middle {
  //  margin-top: 109px;
  //  display: flex;
  //  flex: 1;
  //  width: 100%;
  //  flex-direction: row;
  //  justify-content: space-between;
  //
  //  .box-left {
  //    .el-input {
  //      width: 450px;
  //    }
  //  }
  //
  //  p {
  //    margin-bottom: 12px;
  //  }
  //}
  //
  //.box-bottom {
  //  margin-top: 133px;
  //  width: 100%;
  //  display: flex;
  //  flex-direction: row;
  //  justify-content: space-between;
  //}
}
</style>
