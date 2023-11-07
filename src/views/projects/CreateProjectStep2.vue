<template>
  <main-content>
    <div class="form-page">
      <div class="form-content">
        <el-form
          ref="ruleFormRef"
          label-width="180px"
          label-position="top"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="Name" prop="contractName">
            <el-input
              placeholder="commercial contract name"
              v-model="ruleForm.contractName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Symbol" prop="symbol">
            <el-input placeholder="symbol of contract" v-model="ruleForm.symbol"></el-input>
          </el-form-item>
          <el-form-item label="Percent" prop="sharePercentage">
            <!--            <el-input placeholder="Percent for KOL" v-model="ruleForm.sharePercentage"></el-input>-->
            <el-input-number
              v-model="ruleForm.sharePercentage"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="Brief introduction" prop="briefIntro">
            <el-input placeholder="100 characters used" v-model="ruleForm.briefIntro"></el-input>
          </el-form-item>
          <el-form-item label="Pay token" prop="payToken">
            <!--            <template>-->
            <el-select class="item-select" v-model="ruleForm.payToken">
              <el-option
                v-for="item in SelectTokenList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!--            </template>-->
            <!--            <el-input placeholder="Pay token" v-model="ruleForm.payToken"></el-input>-->
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input placeholder="description" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Right quantity" prop="rightQuantity">
            <!--            <el-input placeholder="Right quantity" v-model="ruleForm.rightQuantity"></el-input>-->
            <el-input-number
              :min="1"
              placeholder="Right quantity"
              v-model="ruleForm.rightQuantity"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <p-wallet-button :loading="loading" class="btn" @click="handleSubmit(ruleFormRef)"
        >submit
      </p-wallet-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { type Address } from '@wagmi/core';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { SelectTokenList } from '@/constant/contracts';
import { useProjectStore } from '@/stores/useProject';

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();
const projectId: string = route.params.projectId as string;
const loading = ref(false);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  contractName: 'FarmersWorld',
  symbol: 'FWD',
  sharePercentage: '10',
  briefIntro: 'Farmers World is the first farming game to function on the NFTs platform',
  payToken: '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964',
  description:
    'Farmers World is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resources, buy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem',
  rightQuantity: '10000',
});

const rules = reactive({
  contractName: [
    { required: true, message: 'Name is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Name must be between 1 and 100 characters', trigger: 'blur' },
  ],
  symbol: [
    { required: true, message: 'Symbol is required', trigger: 'blur' },
    { message: 'Symbol of contract', trigger: 'blur' },
  ],
  briefIntro: [
    { required: true, message: 'Brief introduction is required', trigger: 'blur' },
    {
      min: 1,
      max: 100,
      message: 'Brief introduction must be between 1 and 100 characters',
      trigger: 'blur',
    },
  ],
  payToken: [
    { required: true, message: 'Pay token is required', trigger: 'blur' },
    {
      min: 1,
      max: 100,
      message: 'Pay token must be between 1 and 100 characters',
      trigger: 'blur',
    },
  ],
  description: [
    { required: true, message: 'Description is required', trigger: 'blur' },
    {
      min: 1,
      max: 1000,
      message: 'Description must be between 1 and 100 characters',
      trigger: 'blur',
    },
  ],
});

async function handleSubmit(formEl: FormInstance | undefined) {
  console.log('handleSubmit===');
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
    const { success, data } = await projectStore.createProject({
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
    router.push(`/project/submitsuccess/${projectId}/${data.bizId}`);
  } catch (e) {
    ElMessage.error('create project fail');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.item-select {
  width: 100%;
}
</style>
