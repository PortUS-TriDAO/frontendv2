<template>
  <div class="page-project-create">
    <div class="banner"></div>
    <!-- <span>Project Create</span> -->
    <div class="create-container">
      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="handleBannerUpload"
        :show-file-list="false"
      >
        <img v-if="state.banner" :src="state.banner" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-form label-width="150px">
        <el-form-item label="Name">
          <el-input placeholder="Project Name" v-model="state.name"></el-input>
        </el-form-item>
        <el-form-item label="Symbol">
          <el-input placeholder="Token Symbol" v-model="state.symbol"></el-input>
        </el-form-item>
        <el-form-item label="Charge Token">
          <el-select v-model="state.token" placeholder="select charge token">
            <el-option
              v-for="item in SelectTokenList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Share Percentage">
          <el-input-number
            v-model="state.sharePercentage"
            :min="0"
            :max="100"
            placeholder="min=0 max=100"
            @change="handlePercentageChange"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="Max Rights">
          <el-input-number
            v-model="state.maxRights"
            :min="0"
            placeholder="min=0 max=100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="HomePage">
          <el-input placeholder="Home Page" v-model="state.website"></el-input>
        </el-form-item>
        <el-form-item label="A brief introduction">
          <el-input placeholder="MAX 100 characters" v-model="state.briefIntro"></el-input>
        </el-form-item>
        <el-form-item label="Detailed introduction">
          <el-input
            rows="5"
            resize="none"
            type="textarea"
            placeholder="MAX 1000 character"
            v-model="state.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="uploads">
            <el-upload
              class="upload-demo"
              drag
              :http-request="handleIconUpload"
              action=""
              :show-file-list="false"
            >
              <img v-if="state.icon" :src="state.icon" />
              <div v-else>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">Drop Icon here</div>
              </div>
            </el-upload>
            <el-upload
              class="upload-demo"
              drag
              :http-request="handleScreenShotsUpload"
              action=""
              :show-file-list="false"
            >
              <img v-if="state.screenShots.length > 0" :src="state.screenShots[0]" />
              <div v-else>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">Drop ScreenShot here</div>
              </div>
            </el-upload>
            <el-upload
              class="upload-demo"
              drag
              :http-request="handleScreenShotsUpload"
              action=""
              :show-file-list="false"
            >
              <img v-if="state.screenShots.length > 1" :src="state.screenShots[1]" />
              <div v-else>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">Drop ScreenShot here</div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!account" class="submit-btn" @click="connectWallet">connect</el-button>
          <el-button :loading="loading" v-else class="submit-btn" @click="handleCreateProject">
            Create Project
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElMessage, type UploadProps } from 'element-plus';
import { utils } from 'ethers';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import * as api from '@/api';
import { SelectTokenList } from '@/constant/contracts';
import { getRouterContractFunctions } from '@/stores/useContract';
import { useWalletStore } from '@/stores/useWallet';
import type { Address } from '@/types';
import ossClient from '@/utils/ossClient';

const walletStore = useWalletStore();
const account = computed(() => walletStore.state.account);
const router = useRouter();

const { createProject, getProjectAddress } = getRouterContractFunctions();
const state = reactive({
  banner: '',
  icon: '',
  name: '',
  symbol: '',
  token: '',
  website: '',
  briefIntro: '',
  description: '',
  sharePercentage: 0,
  maxRights: 0,
  screenShots: [],
});
const loading = ref(false);

const connectWallet = () => {
  walletStore.connect();
};

const handleBannerUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name;
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read',
    },
  });
  await ossClient.putACL('/filename/' + filename, 'public-read');
  state.banner = result.url;
};

const handlePercentageChange = (value: number) => {
  let num = 0;
  if (value < 0) {
    num = 0;
  } else if (value > 100) {
    num = 100;
  } else {
    num = Number(value);
  }
  state.sharePercentage = num;
};

const handleIconUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name;
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read',
    },
  });
  await ossClient.putACL('/filename/' + filename, 'public-read');
  state.icon = result.url;
};

const handleScreenShotsUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name;
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read',
    },
  });
  await ossClient.putACL('/filename/' + filename, 'public-read');
  state.screenShots.push(result.url);
};

const handleCreateProject = async () => {
  try {
    loading.value = true;
    const sharePercentage = utils.parseEther((state.sharePercentage / 100).toString()).toString();
    const tx = await createProject(
      state.name,
      state.symbol,
      state.token as Address,
      sharePercentage,
      state.maxRights,
    );
    await waitForTransaction({ hash: tx.hash });

    // 获取本次创建项目的地址
    const projectAddress = await getProjectAddress();
    const { address } = getAccount();
    // 保存数据到服务端
    await api.createProject({
      banner: state.banner,
      icon: state.icon,
      name: state.name,
      symbol: state.symbol,
      token: state.token,
      website: state.website,
      briefIntro: state.briefIntro,
      description: state.description,
      sharePercentage: state.sharePercentage / 100,
      screenShots: state.screenShots,
      projectAddress,
      creatorAddress: address,
      maxSupply: state.maxRights,
    });
    ElMessage.success('Project create success');
    router.push('/project/createsuccess');
  } catch (error) {
    console.log({ createProjectError: error });
    ElMessage.error('Project create failed');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less">
.page-project-create {
  > span {
    font-size: 28px;
    font-weight: bold;
    line-height: 150%;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 16px;
  }
  .create-container {
    margin: 0 auto;
    // padding: 30px;
    margin-bottom: 60px;
    .avatar-uploader {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
      .el-upload {
        width: 100%;
        height: 100%;
        border: 1px dashed var(--el-border-color);
      }
    }
    .el-icon.avatar-uploader-icon {
      font-size: 48px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
  .uploads {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex: 1;
    .el-upload-dragger,
    .upload-demo {
      height: 178px;
      padding: 0;
      width: 170px;
      margin: 0 5px;
    }
  }
  .submit-btn {
    margin: 0 auto;
    width: 185px;
    height: 40px;
    background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
    border-radius: 8px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .el-form {
    justify-content: center;
  }
}
</style>
