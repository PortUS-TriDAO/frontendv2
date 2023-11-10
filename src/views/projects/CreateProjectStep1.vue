<template>
  <main-content>
    <div class="step1-form">
      <div class="form-content">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          label-width="100px"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="Project Name" prop="projectName">
            <el-input placeholder="Party A name" v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="Brief introduction" prop="briefIntro">
            <el-input placeholder="100 characters used" v-model="form.briefIntro"></el-input>
          </el-form-item>
          <el-form-item label="Website" prop="website">
            <el-input placeholder="https:// or http://" v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
              placeholder="12 or 1000 characters used"
              v-model="form.description"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="uploads">
              <uploader @onSuccess="handleAvatar">
                <span>Avatar</span>
              </uploader>
              <uploader @onSuccess="handleCover">
                <span>Cover</span>
              </uploader>
            </div>
            <p>Recommended size: Avatar 200*200 Cover 1200*200</p>
          </el-form-item>
        </el-form>
      </div>
      <p-wallet-button class="btn" @click="handleNext(ruleFormRef)">NEXT</p-wallet-button>
    </div>
  </main-content>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import * as api from '@/api/projects';
import MainContent from '@/components/MainContent.vue';
import Uploader from '@/components/Uploader.vue';

const route = useRoute();
const router = useRouter();

const form = reactive({
  projectName: '',
  briefIntro: '',
  website: '',
  description: '',
  avatar: '',
  cover: '',
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive({
  projectName: [{ required: true, message: 'Please input project name', trigger: 'blur' }],
  briefIntro: [{ required: true, message: 'Please input brief introduction', trigger: 'blur' }],
  website: [{ required: true, message: 'Please input website', trigger: 'blur' }],
  description: [{ required: true, message: 'Please input description', trigger: 'blur' }],
  avatar: [{ required: true, message: 'Please input avatar', trigger: 'blur' }],
  cover: [{ required: true, message: 'Please input cover', trigger: 'blur' }],
});

onMounted(async () => {
  const projectId = route.params.projectId as string;
  if (!projectId) return;
  const { success, data } = await api.getProjectDetail({ projectId });
  if (success) {
    form.projectName = data.projectName;
    form.briefIntro = data.briefIntro;
    form.website = data.website;
    form.description = data.description;
    form.avatar = data.avatar;
    form.cover = data.cover;
  }
});

async function handleNext(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('validate success');
      createProjectStep1();
    } else {
      console.log('error submit', fields);
    }
  });
}

async function createProjectStep1() {
  const formData = toRaw(form);
  if (!formData.avatar) {
    ElMessage.error('Please upload avatar');
    return;
  }

  if (!formData.cover) {
    ElMessage.error('Please upload cover');
    return;
  }
  const { address } = getAccount();
  // TODO: formData as any
  const { success, data } = await api.createProjectStep1({ creatorAddress: address, ...formData });
  if (!success) {
    ElMessage.error('create project failed');
  } else {
    const { projectId } = data as any;
    ElMessage.success('create project success');
    router.push(`/project/create/step2/${projectId}`);
  }
}

const handleAvatar = (url: string) => {
  console.log('handleAvatar', url);
  form.avatar = url;
};

async function handleCover(url: string) {
  console.log('handleCover', url);
  form.cover = url;
}
</script>

<style lang="less" scoped>
.step1-form {
  padding-left: 30px;
  padding-right: 30px;

  .form-content {
    width: 658px;
    margin-top: 20px;
  }

  :deep(.el-form-item__label) {
    margin-top: 16px;
    font-size: 20px;
  }

  .btn {
    border-radius: 67px;
    float: right;
  }

  .uploads {
    display: flex;
    flex-direction: row;
  }
}
</style>
