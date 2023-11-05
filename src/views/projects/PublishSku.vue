<template>
  <main-content>
    <div class="form-page">
      <div class="form-content">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="180px"
          label-position="top"
        >
          <el-form-item label="TokenID" prop="tokenId">
            <el-input
              placeholder="tokenID"
              oninput="value=value.replace(/[^0-9]/g, '')"
              v-model="ruleForm.tokenId"
            ></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input
              placeholder="Price"
              v-model="ruleForm.price"
              oninput="value=value.replace(/[^0-9.]/g, '')"
            ></el-input>
          </el-form-item>
          <el-form-item label="DDL" prop="ddl">
            <el-date-picker v-model="ruleForm.ddl" type="datetime" placeholder="DDL" />
          </el-form-item>
          <el-form-item label="Seller">
            <el-input placeholder="wallet address" disabled :value="ruleForm.seller"></el-input>
          </el-form-item>
          <el-form-item label="PayToken">
            <el-input placeholder="PayToken" disabled :value="ruleForm.payToken"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p-wallet-button :loading="loading" class="btn" @click="handleSave(ruleFormRef)"
        >Save
      </p-wallet-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { type Address, getAccount } from '@wagmi/core';
import { ElMessage, type FormInstance } from 'element-plus';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { useBusinessDetail } from '@/hooks';
import router from '@/router';
import { useProjectStore } from '@/stores/useProject';
import { toBN } from '@/utils/bn';

import { publishSkuRules as rules } from './rules';

const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const projectStore = useProjectStore();

const projectId = route.params.projectId as number;
const bizId = route.params.bizId as number;
const nftAddress = route.params.nftAddress as Address;
const retailAddress = route.params.retailAddress as Address;
const retailId = route.params.retailId as number;
const { address: account } = getAccount();

const ruleForm = reactive({
  tokenId: '1',
  price: '1000',
  ddl: '',
  seller: account,
  payToken: '',
});
const loading = ref(false);

const { data: bizDetail } = useBusinessDetail(bizId);
ruleForm.payToken = bizDetail.value?.payToken;

async function handleSave(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      publishSku();
    }
  });
}

async function publishSku() {
  if (!projectId || typeof projectId !== 'string') {
    ElMessage.error('Project ID is required');
    return;
  }
  try {
    loading.value = true;
    const { success, data } = await projectStore.publishSku({
      projectId,
      price: ruleForm.price,
      nftTokenId: Number(ruleForm.tokenId),
      deadline: new Date(ruleForm.ddl).valueOf() / 1000,
      retailerAddress: retailAddress,
      nftAddress: nftAddress,
      payToken: bizDetail.value.payToken,
      bizId: bizId,
      retailId: retailId,
    });
    if (!success) throw new Error(data as string);
    ElMessage.success('Publish sku success');
    router.push('/project/addnft/success');
  } catch (error) {
    console.log('Publish sku failed', error);
    ElMessage.error('Publish sku failed');
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="less" scoped>
.step2-form {
  padding-left: 50px;

  .form-content {
    width: 658px;

    :deep(.el-form-item__label) {
      margin-top: 16px;
      font-size: 20px;
    }
  }

  .btn {
    float: right;
  }
}
</style>
