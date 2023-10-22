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
      <p-wallet-button class="btn" @click="handleSave(ruleFormRef)">Save</p-wallet-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { Address } from '@wagmi/core';
import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainContent from '@/components/MainContent.vue';
import { useProjectStore } from '@/stores/useProject';

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const projectStore = useProjectStore();

// const { projectId, businessContractAddress } = route.params;
const projectId: string = route.params.projectId as string;
const businessContractAddress: string = route.params.businessContractAddress as string;

const ruleForm = reactive({
  tokenId: '',
  price: '',
  ddl: '',
  seller: 'sdfsdafsdfgsdgsdfg',
  payToken: ';lgk;dfkg;dfgk;',
});
const loading = ref(false);

const rules = {
  tokenId: [{ required: true, message: 'TokenId is required', trigger: 'blur' }],
  price: [{ required: true, message: 'Price is required', trigger: 'blur' }],
  ddl: [{ required: true, message: 'DDL is required', trigger: 'blur' }],
  seller: [{ required: true, message: 'Seller is required', trigger: 'blur' }],
  payToken: [{ required: true, message: 'PayToken is required', trigger: 'blur' }],
};

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
  if (!businessContractAddress || typeof businessContractAddress !== 'string') {
    ElMessage.error('Business Contract Address is required');
    return;
  }
  try {
    loading.value = true;

    const { success, data } = await projectStore.publishSku(
      projectId,
      BigInt(price.value),
      Number(ruleForm.tokenId),
      new Date(ruleForm.ddl).valueOf(),
      businessContractAddress as Address,
    );
    if (!success) throw new Error(data);
    ElMessage.success('Publish sku success');
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
