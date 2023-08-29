<template>
  <div class="page-project-create">
    <!-- <div class="banner"></div> -->
    <span>Project Create</span>
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
          <el-input
            placeholder="Charge Token e.g. USDT contract address"
            v-model="state.token"
          ></el-input>
        </el-form-item>
        <el-form-item label="Share Percentage">
          <el-input
            placeholder="Share Percentage max 1"
            type="number"
            max="1"
            v-model="state.sharePercentage"
          ></el-input>
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
                <div class="el-upload__text">Drop Icon here or <em>click to upload</em></div>
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
                <div class="el-upload__text">Drop Icon here or <em>click to upload</em></div>
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
                <div class="el-upload__text">Drop Icon here or <em>click to upload</em></div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <div class="buttons">
        <button v-if="!account" class="submit-btn" @click="connectWallet">connect</button>
        <el-button :loading="loading" v-else class="submit-btn" @click="handleCreateProject">
          Create Project
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { type UploadProps, ElMessage } from 'element-plus'
import ossClient from '@/utils/ossClient'
import { utils } from 'ethers'
import { getRouterContractFunctions } from '@/stores/useContract'
import * as api from '@/api'
import { useWalletStore } from '@/stores/useWallet'
import type { Address } from '@/types'
import { waitForTransaction, getAccount } from '@wagmi/core'

const walletStore = useWalletStore()
const account = computed(() => walletStore.state.account)

const { createProject, getProjectAddress } = getRouterContractFunctions()

const state = reactive({
  banner: '',
  icon: '',
  name: '',
  symbol: '',
  token: '',
  website: '',
  briefIntro: '',
  description: '',
  sharePercentage: '',
  screenShots: []
})
const loading = ref(false)

const connectWallet = () => {
  walletStore.connect()
}

const handleBannerUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read'
    }
  })
  await ossClient.putACL('/filename/' + filename, 'public-read')
  state.banner = result.url
}

const handleIconUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read'
    }
  })
  await ossClient.putACL('/filename/' + filename, 'public-read')
  state.icon = result.url
}

const handleScreenShotsUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read'
    }
  })
  await ossClient.putACL('/filename/' + filename, 'public-read')
  state.screenShots.push(result.url)
}

const handleCreateProject = async () => {
  try {
    console.log({ state })
    loading.value = true
    const sharePercentage = utils.parseEther(state.sharePercentage).toString()
    const tx = await createProject(
      state.name,
      state.symbol,
      state.token as Address,
      sharePercentage
    )
    await waitForTransaction({ hash: tx.hash })

    // 获取本次创建项目的地址
    const projectAddress = await getProjectAddress()
    const { address } = getAccount()
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
      sharePercentage: sharePercentage,
      screenShots: state.screenShots,
      projectAddress,
      creatorAddress: address
    })
    ElMessage.success('Project create success')
  } catch (error) {
    console.log({ createProjectError: error })
    ElMessage.error('Project create failed')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less">
.page-project-create {
  // .banner {
  //   background: url('@/assets/images/banner.png') center center no-repeat;
  //   background-size: cover;
  //   height: 257px;
  //   width: 100vw;
  // }
  > span {
    font-size: 28px;
    font-weight: bold;
    line-height: 150%;
    display: block;
    width: 1135px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 16px;
  }
  .create-container {
    margin: 0 auto;
    padding: 30px;
    width: 1135px;
    .avatar-uploader {
      width: 1135px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
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
  .demo-form-inline .el-input {
    --el-input-width: 638px;
  }
  .demo-form-inline .el-textarea {
    width: 1310px;
  }
  .uploads {
    width: 1340px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .el-upload-dragger,
    .upload-demo {
      // > img {
      width: 278px;
      height: 178px;
      // }
    }
  }

  .buttons {
    width: 1340px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .submit-btn {
      margin: 0 auto;
      width: 655px;
      height: 48px;
      background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
      border-radius: 8px;
      border: none;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .el-form {
    // flex-direction: row;
    justify-content: center;
  }
}
</style>
