<template>
  <div class="page-project-create">
    <div class="banner"></div>
    <span>Project Create</span>
    <div class="main-container create-container">
      <el-form :inline="true" label-position="top" class="demo-form-inline">
        <el-form-item label="Name">
          <el-input placeholder="Project Name"></el-input>
        </el-form-item>
        <el-form-item label="A brief introduction">
          <el-input placeholder="MAX 100 characters"></el-input>
        </el-form-item>
        <el-form-item label="Author’s name">
          <el-input placeholder="MAX 26 characters"></el-input>
        </el-form-item>
        <el-form-item label="My Game/ NFT homePage">
          <el-input placeholder="My Game/ NFT homePage"></el-input>
        </el-form-item>
        <el-form-item label="Detailed introduction">
          <el-input rows="5" type="textarea" placeholder="MAX 1000 character"></el-input>
        </el-form-item>
        <el-form-item label="Notice">
          <el-input rows="5" type="textarea" placeholder="MAX 500 character"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="uploads">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            </el-upload>
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            </el-upload>
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="buttons">
            <button class="submit-btn">submit</button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.page-project-create {
  .banner {
    background: url('@/assets/images/banner.png') center center no-repeat;
    background-size: cover;
    height: 257px;
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
    padding: 30px;
  }
  .demo-form-inline .el-input {
    --el-input-width: 638px;
  }
  .demo-form-inline .el-textarea {
    width: 1310px;
  }
  .demo-form-inline .uploads {
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
    }
  }
}
</style>
