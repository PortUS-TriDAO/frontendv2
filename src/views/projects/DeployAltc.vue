<template>
  <main-content>
    <div class="page-deploy-altc">
      <h3 class="title">Deploy ALTC (Agent Licence Token Contract)</h3>
      <div class="top-box">
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
      </div>
      <div class="form-box">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-position="top"
          :inline="true"
        >
          <el-form-item label="ALTC Name" prop="contractName">
            <el-input v-model="ruleForm.contractName"></el-input>
          </el-form-item>
          <el-form-item label="Percent for Agents" prop="sharePercentage">
            <el-input
              v-model="ruleForm.sharePercentage"
              :max="100"
              oninput="value=Number(value.replace(/[^0-9.]/g, '')) > 100 ? 100 : Number(value.replace(/[^0-9.]/g, ''))"
            ></el-input>
          </el-form-item>
          <el-form-item label="Deploy Intro" prop="briefIntro">
            <el-input placeholder="100 characters used" v-model="ruleForm.briefIntro"></el-input>
          </el-form-item>
          <el-form-item label="Pay token" prop="payToken">
            <el-select class="item-select" v-model="ruleForm.payToken">
              <el-option
                v-for="item in SelectTokenList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ALTC Description" prop="description">
            <el-input placeholder="description" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Right Quantity" prop="rightQuantity">
            <el-input
              placeholder="Right quantity"
              v-model="ruleForm.rightQuantity"
              oninput="value=value.replace(/[^0-9.]/g, '')"
            ></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <div class="save-btn">
              <p-wallet-button :loading="loading" class="btn" @click="handleSubmit(ruleFormRef)"
                >Deploy
              </p-wallet-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

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
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { type Address, waitForTransaction } from '@wagmi/core';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { SelectTokenList } from '@/constant/contracts';
import { useProjectStore } from '@/stores/useProject';
import { useWhiteListRightsContract } from '@/stores/useWhiteListRightsContract';
import { deployAltcRules } from '@/views/projects/rules';

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();
const whiteListRightsContract = useWhiteListRightsContract();
const projectId: string = route.params.projectId as string;
const loading = ref(false);
const allowWhiteList = ref(false);
const allowFreeMint = ref(false);
const allowAirdrop = ref(false);
const dropSettingLoading = ref(false);
const projectAddress = ref('');
const bizId = ref<Number>(0);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  contractName: 'dgdfg',
  symbol: 'tttt',
  sharePercentage: '2',
  briefIntro: 'dfgdfsgds',
  payToken: '0x99479872494dc582af1F7fBBE43Ea9CC6143d159',
  description: 'sdfsdfsf',
  rightQuantity: '2342',
});

const dropSettingForm = reactive({
  whiteListCount: 0,
  whiteListStartTime: 0,
  freeMintStartTime: 0,
});

const rules = reactive(deployAltcRules);

async function handleSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      createProject();
    } else {
      console.log('error submit', fields);
    }
  });
}

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
    toNext();
  } catch (e) {
    console.error(e, bizId);
    ElMessage.error('setting failed');
  } finally {
    dropSettingLoading.value = false;
  }
}

const createProject = async () => {
  const {
    contractName,
    sharePercentage,
    symbol,
    payToken,
    rightQuantity,
    briefIntro,
    description,
  } = toRaw(ruleForm);
  const token = payToken as Address;
  try {
    loading.value = true;

    // TODO: percentage
    const {
      success,
      data,
      projectAddress: projectAddr,
    } = await projectStore.createProject({
      projectId,
      briefIntro,
      description,
      contractName,
      symbol,
      payToken: token,
      rightQuantity,
      sharePercentage,
    });
    console.log('createProject===,', projectAddr);
    if (!success) throw new Error(data);
    ElMessage.success('create project success');
    projectAddress.value = projectAddr;
    // router.push(`/project/submitsuccess/${projectId}/${data.bizId}`);
    bizId.value = data.bizId;
  } catch (e) {
    console.error('create project fail', e);
    ElMessage.error('create project fail');
  } finally {
    loading.value = false;
  }
};

function toNext() {
  if (!bizId.value) {
    ElMessage.error('No bizId found');
    return;
  }
  router.push(`/project/submitsuccess/${projectId}/${bizId.value}`);
}
</script>

<style lang="less" scoped>
.page-deploy-altc {
  h5 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 14px;
    padding: 20px;
  }

  .top-box {
    display: flex;
    flex-direction: row;

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
  }

  .save-btn {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .title {
    margin: 20px;
    font-size: 36px;
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

.el-select {
  width: 100%;
}
</style>
