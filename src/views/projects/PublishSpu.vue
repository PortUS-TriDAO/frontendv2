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
          <el-form-item label="Name" prop="name">
            <el-input placeholder="NFT Name" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="DDL" prop="ddl">
            <el-date-picker v-model="ruleForm.ddl" type="datetime" placeholder="ddl" />
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <p-number-input placeholder="Price" v-model="ruleForm.price"></p-number-input>
          </el-form-item>
          <el-form-item label="Brief introduction" prop="briefIntro">
            <el-input
              placeholder="12 of 1000 characters used"
              v-model="ruleForm.briefIntro"
            ></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
              placeholder="12 of 1000 characters used"
              v-model="ruleForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="Quantity" prop="quantity">
            <p-number-input
              placeholder="the number of SPU.0 represents infinitely many"
              value-type="uint"
              v-model="ruleForm.quantity"
            ></p-number-input>
          </el-form-item>
          <el-form-item label="Seller">
            <el-input disabled placeholder="wallet address" :value="ruleForm.seller"></el-input>
          </el-form-item>
          <el-form-item label="PayToken">
            <el-input disabled placeholder="PayToken" :value="ruleForm.payToken"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="uploader-box">
              <uploader></uploader>
              <uploader></uploader>
              <uploader></uploader>
            </div>
            <p>Recommended size: Avatar 200*200 Cover 1200*200 Image 1:1</p>
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
import Uploader from '@/components/Uploader.vue';
import { useBusinessDetail } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const projectStore = useProjectStore();

const projectId = route.params.projectId as number;
const bizId = route.params.bizId as number;
const nftAddress = route.params.nftAddress as Address;
const retailAddress = route.params.retailAddress as Address;
const retailId = route.params.retailId as number;

const { data: bizDetail } = useBusinessDetail(`${bizId}`);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: '',
  ddl: '',
  price: '',
  briefIntro: '',
  description: '',
  quantity: 0,
  seller: '',
  payToken: '',
  avatar: '',
  image: '',
  cover: '',
});

const rules = reactive({
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  ddl: [{ required: true, message: 'DDL is required', trigger: 'blur' }],
  price: [{ required: true, message: 'Price is required', trigger: 'blur' }],
  briefIntro: [{ required: true, message: 'Brief introduction is required', trigger: 'blur' }],
  description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
  quantity: [{ required: true, message: 'Quantity is required', trigger: 'blur' }],
  seller: [{ required: true, message: 'Seller is required', trigger: 'blur' }],
});

async function handleSave(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, field) => {
    if (valid) {
      publishSpu();
    }
  });
}

async function publishSpu() {
  try {
    loading.value = true;
    // 这里tokenId默认先填0
    const { success, data } = await projectStore.publishSpu({
      retailerAddress: retailAddress,
      nftAddress: nftAddress,
      projectId,
      bizId,
      retailId,
      tokenId: 0, // 这里tokenId默认填0
      price: BigInt(ruleForm.price), // TODO 这里改用BigNumber
      ddl: ruleForm.ddl.valueOf() / 1000,
      payToken: bizDetail.value?.payToken as Address,
      briefIntro: ruleForm.briefIntro,
      description: ruleForm.description,
      nftQuantity: Number(ruleForm.quantity),
      avatar: ruleForm.avatar,
      image: ruleForm.image,
      cover: ruleForm.cover,
    });
    if (!success) throw new Error(data);

    ElMessage.success('Publish spu success');
  } catch (error) {
    ElMessage.error('publish spu failed');
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

.uploader-box {
  display: flex;
  flex-direction: row;
}
</style>
