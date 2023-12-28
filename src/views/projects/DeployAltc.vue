<template>
  <main-content>
    <div class="page-deploy-altc">
      <h3 class="title">Deploy ALTC (Agent Licence Token Contract)</h3>
      <div class="top-box">
        <div class="blockchain">
          <h5>BlockChain</h5>
          <div
            class="chain-box"
            @click="blockChainSelect = !blockChainSelect"
            :class="{ 'contract-type-select': blockChainSelect }"
          >
            <span>Ethereum</span>
          </div>
        </div>

        <div class="blockchain">
          <h5>Contract Type</h5>
          <div
            class="chain-box"
            @click="contractTypeSelect = !contractTypeSelect"
            :class="{ 'contract-type-select': contractTypeSelect }"
          >
            <span>ALTC</span>
          </div>
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
            <el-input type="textarea" autosize v-model="ruleForm.briefIntro"></el-input>
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
            <el-input
              type="textarea"
              autosize
              placeholder="description"
              v-model="ruleForm.description"
            ></el-input>
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
const dropSettingLoading = ref(false);
const projectAddress = ref('');
const bizId = ref<Number>(0);
const contractTypeSelect = ref(false);
const blockChainSelect = ref(false);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  contractName: '',
  symbol: '',
  sharePercentage: '',
  briefIntro: '',
  payToken: '',
  description: '',
  rightQuantity: '',
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
    if (!success) throw new Error(data);
    ElMessage.success('create project success');
    projectAddress.value = projectAddr;
    bizId.value = data.bizId;
    router.push(`/project/create/dropSetting/${projectId}/${projectAddr}/${bizId.value}`);
  } catch (e) {
    console.error('create project fail', e);
    ElMessage.error('create project fail');
  } finally {
    loading.value = false;
  }
};
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
      border-width: 2px;

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

      .contract-type-select {
        border: solid 2px #3182f7;
        border-radius: 45px 0 45px 45px;
      }
    }

    .contract-type {
      padding: 20px;
      box-sizing: border-box;

      .contract-type-box {
        width: 220px;
        line-height: 50px;
        text-align: center;
        border: solid 1px #ccc;
        cursor: pointer;
      }

      .contract-type-select {
        border: solid 2px #3182f7;
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
