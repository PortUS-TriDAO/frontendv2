<template>
  <main-content>
    <div class="form-page">
      <div class="form-content">
        <el-form ref="ruleFormRef" label-width="180px" label-position="top" :model="ruleForm" :rules="rules">
          <el-form-item label="Name" prop="contractName">
            <el-input placeholder="commercial contract name" v-model="ruleForm.contractName"></el-input>
          </el-form-item>
          <el-form-item label="Symbol" prop="symbol">
            <el-input placeholder="symbol of contract" v-model="ruleForm.symbol"></el-input>
          </el-form-item>
          <el-form-item label="Percent" prop="sharePercentage">
            <el-input placeholder="Percent for KOL" v-model="ruleForm.sharePercentage"></el-input>
          </el-form-item>
          <el-form-item label="Brief introduction" prop="briefIntro">
            <el-input placeholder="100 characters used" v-model="ruleForm.briefIntro"></el-input>
          </el-form-item>
          <el-form-item label="Pay token" prop="payToken">
            <el-input placeholder="Pay token" v-model="ruleForm.payToken"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input placeholder="description" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Right quantity" prop="rightQuantity">
            <el-input placeholder="Right quantity" v-model="ruleForm.rightQuantity"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p-button class="btn" @click="handleSubmit(ruleFormRef)">submit</p-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>

import { ref,reactive,toRaw } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import type {FormInstance} from "element-plus";
import MainContent from '@/components/MainContent.vue';
import { useRouterContract } from "@/stores/useRouterContract";

const router = useRouter();
const route = useRoute();
const routerContract = useRouterContract()
const projectId = route.params.projectId;

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  contractName: '',
  symbol: "",
  sharePercentage: '',
  briefIntro: '',
  payToken: '',
  description: '',
  rightQuantity: '',
  businessContractAddress: ""
})

const rules = reactive({
  contractName: [
    { required: true, message: 'Name is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Name must be between 1 and 100 characters', trigger: 'blur' }
  ],
  symbol: [
    { required: true, message: 'Symbol is required', trigger: 'blur' },
    { message: 'Symbol of contract', trigger: 'blur' }
  ],
  sharePercentage: [
    { required: true, message: 'Percent is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Percent must be between 1 and 100 characters', trigger: 'blur' }
  ],
  briefIntro: [
    { required: true, message: 'Brief introduction is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Brief introduction must be between 1 and 100 characters', trigger: 'blur' }
  ],
  payToken: [
    { required: true, message: 'Pay token is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Pay token must be between 1 and 100 characters', trigger: 'blur' }
  ],
  description: [
    {required: true,message: 'Description is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Description must be between 1 and 100 characters', trigger: 'blur' }
  ],
  rightQuantity: [
    { required: true, message: 'Right quantity is required', trigger: 'blur' },
    { min: 1, max: 100, message: 'Right quantity must be between 1 and 100 characters', trigger: 'blur' }
  ]
})

async function handleSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid,fields)=> {
    if (valid) {
      console.log("validate success")
      const formData = toRaw(ruleForm)
      console.log(formData)
      createProject()
      // createProjectStep2()
    } else {
      console.log("error submit",fields)
    }
  })
}

async function createProject() {
  const { contractName,sharePercentage,symbol,payToken,rightQuantity } = toRaw(ruleForm)
  const  tx = await routerContract.createProject(
    contractName,
    symbol,
    payToken,
    sharePercentage,
    rightQuantity
  );
  console.log({tx})
}

async function createProjectStep2() {
  router.push('/project/submitsuccess');
}
</script>

<style lang="less" scoped></style>
