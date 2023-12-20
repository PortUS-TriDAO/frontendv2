<template>
  <main-content>
    <!-- Drop Setting -->
    <div class="drop-setting">
      <h5>Drop Setting</h5>
      <!-- White List -->
      <div class="drop-item">
        <div class="title">
          <el-switch v-model="allowWhiteList"></el-switch>
          <h6>White list</h6>
        </div>
        <el-form label-position="top" :inline="true">
          <el-form-item label="Numbers of items">
            <el-input
              v-model="dropSettingForm.whiteListCount"
              oninput="value=value.replace(/[^0-9.]/g, '')"
            ></el-input>
          </el-form-item>
          <el-form-item label="Mint start date & time">
            <el-date-picker
              v-model="dropSettingForm.whiteListStartTime"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- Free mint -->
      <div class="drop-item">
        <div class="title">
          <el-switch v-model="allowFreeMint"></el-switch>
          <h6>Free Mint</h6>
        </div>
        <el-form label-position="top" :inline="true">
          <el-form-item label="Mint start time">
            <el-date-picker
              v-model="dropSettingForm.freeMintStartTime"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- Airdrop -->
      <div class="drop-item">
        <div class="title">
          <el-switch v-model="allowAirdrop"></el-switch>
          <h6>Airdrop</h6>
        </div>
        <p style="margin-left: 20px">Add address in My profile</p>
      </div>

      <div class="save-btn">
        <p-wallet-button :loading="dropSettingLoading" @click="setDropSetting"
          >Save
        </p-wallet-button>
      </div>
    </div>
  </main-content>
</template>

<script setup lang="ts">
import { Address, waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { useWhiteListRightsContract } from '@/stores/useWhiteListRightsContract';

const route = useRoute();
const router = useRouter();

const projectId = route.params.projectId;
const projectAddress = route.params.projectAddress;
const bizId = route.params.bizId;

const allowWhiteList = ref(false);
const allowFreeMint = ref(false);
const allowAirdrop = ref(false);
const dropSettingLoading = ref(false);
const whiteListRightsContract = useWhiteListRightsContract();

const dropSettingForm = reactive({
  whiteListCount: 0,
  whiteListStartTime: 0,
  freeMintStartTime: 0,
});

async function setDropSetting() {
  try {
    if (!(allowWhiteList.value || allowAirdrop.value || allowAirdrop.value)) {
      router.push(`/project/submitsuccess/${projectId}/${bizId}`);
      return;
    }
    dropSettingLoading.value = true;
    const { whiteListCount, freeMintStartTime, whiteListStartTime } = toRaw(dropSettingForm);
    const tx = await whiteListRightsContract.setDropSetting(
      projectAddress as Address,
      new Date(freeMintStartTime).valueOf() / 1000,
      new Date(whiteListStartTime).valueOf() / 1000,
      whiteListCount,
    );
    await waitForTransaction(tx);
    ElMessage.success('setting success');
    router.push(`/project/submitsuccess/${projectId}/${bizId}`);
  } catch (e) {
    console.error(e, bizId);
    ElMessage.error('setting failed');
  } finally {
    dropSettingLoading.value = false;
  }
}
</script>

<style lang="less" scoped>
.drop-setting {
  padding: 20px;
  box-sizing: border-box;

  h5 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 14px;
  }

  .drop-item {
    h6 {
      font-size: 24px;
      display: inline-block;
      //margin-left: 15px;
      margin-bottom: 15px;
    }
  }

  .save-btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

.el-form-item {
  width: 400px;
  font-size: 24px;
  font-weight: 700;
}

.el-select {
  width: 100%;
}
</style>
