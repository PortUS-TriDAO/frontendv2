<template>
  <div>
    <el-form :model="form" label-width="180px">
      <el-form-item label="Name">
        <el-input v-model="form.nickName" placeholder="Nick name"></el-input>
      </el-form-item>
      <el-form-item label="HomePage">
        <el-input v-model="form.homePage" placeholder="homePage"></el-input>
      </el-form-item>
      <el-form-item label="X">
        <el-input v-model="form.twitter" placeholder="X"></el-input>
      </el-form-item>
      <el-form-item label="Discord">
        <el-input v-model="form.discord" placeholder="discord"></el-input>
      </el-form-item>
      <el-form-item label="Instagram">
        <el-input v-model="form.instagram" placeholder="Instagram"></el-input>
      </el-form-item>
      <el-form-item label="Avatar">
        <uploader @on-success="onAvatarSuccess"></uploader>
      </el-form-item>
      <el-form-item>
        <p-button @click="onSubmit">Submit</p-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { reactive, toRaw } from 'vue';

import { postKolInfo } from '@/api';
import Uploader from '@/components/Uploader.vue';

const defaultForm = {
  kolAddress: '',
  nickName: '',
  twitter: '',
  discord: '',
  instagram: '',
  homePage: '',
  logo: '',
};

const form = reactive({ ...defaultForm });

const onAvatarSuccess = (url: string) => {
  form.logo = url;
};

const resetForm = () => {
  Object.assign(form, defaultForm);
};

const onSubmit = async () => {
  const { address } = getAccount();
  const params = toRaw(form);
  params.kolAddress = address;
  try {
    const result = await postKolInfo(params);
    if (result.success) {
      ElMessage.success('submit profile info success');
      resetForm();
    } else {
      ElMessage('submit profile info failed');
    }
  } catch (error) {
    ElMessage('submit profile info failed');
  }
};
</script>

<style lang="less" scoped></style>
