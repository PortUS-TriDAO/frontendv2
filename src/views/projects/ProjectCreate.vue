<template>
  <div class="main-width page-project-create">
    <div class="banner"></div>
    <span>Project Create</span>
    <div class="main-container create-container">
      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="handleBannerUpload"
        :show-file-list="false"
        :on-success="uploadBannerSuccess"
      >
        <img v-if="state.banner" :src="state.banner" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-form label-position="top">
        <el-form-item label="Name">
          <el-input placeholder="Project Name" v-model="state.name"></el-input>
        </el-form-item>
        <el-form-item label="Symbol">
          <el-input placeholder="Token Symbol" v-model="state.symbol"></el-input>
        </el-form-item>
        <el-form-item label="Charge Token">
          <el-input
            placeholder="Charge Token e.g. USDT contract address"
            v-model="state.symbol"
          ></el-input>
        </el-form-item>
        <el-form-item label="Share Percentage">
          <el-input placeholder="Share Percentage max 100" v-model="state.symbol"></el-input>
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
            <el-upload class="upload-demo" drag action="" multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop Icon here or <em>click to upload</em></div>
            </el-upload>
            <el-upload class="upload-demo" drag action="" multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop ScreenShot here or <em>click to upload</em></div>
            </el-upload>
            <el-upload class="upload-demo" drag action="" multiple>
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop ScreenShot here or <em>click to upload</em></div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <div class="buttons">
        <button class="submit-btn" @click="handleCreateProject">submit</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import type { UploadProps } from 'element-plus'
import ossClient from '@/utils/ossClient'
import { utils } from 'ethers'
import { getRouterContractFunctions } from '@/stores/useContract'

const { createProject } = getRouterContractFunctions()

const state = reactive({
  banner: '',
  name: '',
  symbol: '',
  website: '',
  briefIntro: '',
  description: ''
})

const handleBannerUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  console.log({ response, uploadFile })
  const filename = response.file.name
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read'
    }
  })
  await ossClient.putACL('/filename/' + filename, 'public-read')
  state.banner = result.url
}
const uploadBannerSuccess = () => {}

const handleCreateProject = async () => {
  try {
    const tx = await createProject(
      state.name,
      state.symbol,
      '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964',
      utils.parseEther('0.3').toString()
    )
    console.log({ tx })
  } catch (error) {
    console.log({ error })
  }
}
</script>

<style lang="less">
.page-project-create {
  .banner {
    background: url('@/assets/images/banner.png') center center no-repeat;
    background-size: cover;
    height: 257px;
    width: 100vw;
  }
  > span {
    font-size: 28px;
    font-weight: bold;
    line-height: 150%;
    display: block;
    width: 1400px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 16px;
  }
  .create-container {
    margin: 0 auto;
    padding: 30px;
    width: 1400px;
    .avatar-uploader {
      width: 1300px;
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
  }
  .buttons {
    width: 1340px;
    margin-top: 15px;
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
