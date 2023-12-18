<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
import { waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { reactive, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';

import { useBusinessDetail } from '@/hooks';
import { useWhiteListRightsContract } from '@/stores/useWhiteListRightsContract';

const route = useRoute();
const projectId = route.params.projectId;
const bizId = route.params.bizId;

const allowWhiteList = ref(false);
const allowFreeMint = ref(false);
const allowAirdrop = ref(false);
const dropSettingLoading = ref(false);

const dropSettingForm = reactive({
  whiteListCount: 0,
  whiteListStartTime: 0,
  freeMintStartTime: 0,
});

const whiteListRightsContract = useWhiteListRightsContract();

async function setDropSetting() {
  try {
    dropSettingLoading.value = true;
    const { whiteListCount, freeMintStartTime, whiteListStartTime } = toRaw(dropSettingForm);
    console.log({
      projectAddress: projectAddress.value,
      freeMintStartTime: new Date(freeMintStartTime).valueOf(),
      whiteListStartTime: new Date(whiteListStartTime).valueOf(),
      whiteListCount,
      bizid: bizId.value,
    });
    const tx = await whiteListRightsContract.setDropSetting(
      projectAddress.value as Address,
      new Date(freeMintStartTime).valueOf() / 1000,
      new Date(whiteListStartTime).valueOf() / 1000,
      whiteListCount,
    );
    await waitForTransaction(tx);
    ElMessage.success('setting success');
  } catch (e) {
    console.error(e, bizId);
    ElMessage.error('setting failed');
  } finally {
    dropSettingLoading.value = false;
  }
}
</script>

<style lang="less" scoped></style>
