<template>
  <main-content>
    <div class="page-deploy-altc">
      <h3 class="title">Deploy ALTC</h3>
      <div class="form-box">
        <el-form label-position="top" :inline="true">
          <el-form-item label="Deploy ALTC">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Percent for Agents">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Deploy Intro">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Pay token">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="ALTC Description">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Right Quantity">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="blockchain">
        <h5>BlockChain</h5>
        <div class="chain-box">
          <span>Ethereum</span>
        </div>
      </div>

      <div class="contract-type">
        <h5>Contract Type</h5>
        <div class="contract-type-box">ALTC</div>
      </div>

      <div class="save-btn">
        <p-button>Save</p-button>
      </div>

      <!-- Drop Setting -->
      <div class="drop-setting">
        <h5>Drop Setting</h5>
        <!-- White List -->
        <div class="drop-item">
          <div class="title">
            <el-switch></el-switch>
            <h6>White list</h6>
          </div>
          <el-form label-position="top" :inline="true">
            <el-form-item label="Numbers of items">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="Mint start date & time">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- Free mint -->
        <div class="drop-item">
          <div class="title">
            <el-switch></el-switch>
            <h6>Free Mint</h6>
          </div>
          <el-form label-position="top" :inline="true">
            <el-form-item label="Mint start time">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>

        <!-- Airdrop -->
        <div class="drop-item">
          <div class="title">
            <el-switch></el-switch>
            <h6>Airdrop</h6>
          </div>
          <p style="margin-left: 20px">Add address in My profile</p>
          <!-- <el-form label-position="top" :inline="true">
            <el-form-item label="Numbers of items">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="Mint start date & time">
              <el-input></el-input>
            </el-form-item>
          </el-form> -->
        </div>

        <div class="save-btn">
          <p-button>Deploy</p-button>
        </div>
      </div>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import MainContent from '@/components/MainContent.vue';
</script>

<style lang="less" scoped>
.page-deploy-altc {
  h5 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 14px;
    padding: 20px;
  }
  .title {
    margin: 20px;
    font-size: 36px;
  }
  .blockchain {
    // height: 389px;
    padding: 20px;
    box-sizing: border-box;
    .chain-box {
      width: 437px;
      line-height: 220px;
      background: url('@/assets/images/chain-bg.jpg') center center no-repeat;
      background-size: contain;
      > span {
        font-size: 32px;
        color: rgba(35, 115, 192, 1);
        margin-left: 24px;
        font-weight: 700;
      }
    }
  }
  .contract-type {
    padding: 20px;
    .contract-type-box {
      width: 220px;
      line-height: 50px;
      text-align: center;
      border: solid 1px #ccc;
    }
  }
  .save-btn {
    display: flex;
    justify-content: center;
  }

  .drop-setting {
    box-sizing: border-box;
    .drop-item {
      h6 {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }
}
.el-form-item {
  width: 440px;
  margin: 20px;
  font-size: 24px;
  font-weight: 700;
}
</style>
