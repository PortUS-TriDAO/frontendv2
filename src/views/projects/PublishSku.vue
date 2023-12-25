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
          <el-form-item label="NFT Quantity" prop="sellAmount">
            <el-input
              placeholder="Price"
              v-model="ruleForm.sellAmount"
              oninput="value=value.replace(/[^0-9]/g, '')"
            ></el-input>
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
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { postSkuUpdate } from '@/api/nft';
import MainContent from '@/components/MainContent.vue';
import { useBusinessDetail } from '@/hooks';
import router from '@/router';
import { useProjectStore } from '@/stores/useProject';

import { publishSkuRules as rules } from './rules';

const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const projectStore = useProjectStore();

const projectId = Number(route.params.projectId);
const bizId = Number(route.params.bizId);
const nftAddress = route.params.nftAddress as Address;
const retailAddress = route.params.retailAddress as Address;
const retailId = Number(route.params.retailId);
const { address: account } = getAccount();

const ruleForm = reactive({
  tokenId: '',
  price: '',
  ddl: '',
  seller: account,
  sellAmount: 1,
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
  console.log('projectId:', projectId);
  if (!projectId) {
    ElMessage.error('Project ID is required');
    return;
  }
  try {
    loading.value = true;
    console.log('publishSku', {
      projectId,
      price: ruleForm.price,
      nftTokenId: Number(ruleForm.tokenId),
      deadline: new Date(ruleForm.ddl).valueOf() / 1000,
      sellAmount: Number(ruleForm.sellAmount),
      retailerAddress: retailAddress,
      nftAddress: nftAddress,
      payToken: bizDetail.value.payToken,
      bizId: bizId,
      retailId: retailId,
    });
    const { success, data } = await projectStore.publishSku({
      projectId,
      price: ruleForm.price,
      nftTokenId: Number(ruleForm.tokenId),
      deadline: new Date(ruleForm.ddl).valueOf() / 1000,
      sellAmount: Number(ruleForm.sellAmount),
      retailerAddress: retailAddress,
      nftAddress: nftAddress,
      payToken: bizDetail.value.payToken,
      bizId: bizId,
      retailId: retailId,
    });
    if (!success) throw new Error(data as string);
    await postSkuUpdate({
      skuId: data?.skuId,
      imgUrl: 'https://portus.oss-cn-hongkong.aliyuncs.com/filename/logo.webp',
      nftName: 'FarmersWorld',
    });
    ElMessage.success('Contract Binding Success');
    router.push('/project/addnft/success');
  } catch (error) {
    console.log('Publish sku failed', error);
    ElMessage.error('Contract Binding Failed');
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
