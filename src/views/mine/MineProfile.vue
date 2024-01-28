<template>
  <div class="mine-profile">
    <el-form v-show="editMode" :model="form" label-width="180px">
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
        <uploader :src="form.logo" @on-success="onAvatarSuccess"></uploader>
      </el-form-item>
      <el-form-item>
        <p-button @click="onSubmit">Submit</p-button>
        <p-button @click="handleCancel">Cancel</p-button>
      </el-form-item>
    </el-form>
    <div v-show="!editMode" class="profile">
      <img :src="form.logo" alt="" />
      <div class="profile-right">
        <div class="contact">
          <span>{{ form.nickName }}</span>
          <a class="twitter" target="_blank" :href="form.twitter"></a>
          <a class="homepage" target="_blank" :href="form.homePage"></a>
          <a class="discord" target="_blank" :href="form.discord"></a>
          <a class="instagram" target="_blank" :href="form.instagram"></a>
        </div>
        <div class="ben">
          <p-button @click="handleEdit">Edit</p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAccount } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRaw } from 'vue';

import { getKolInfo, postKolInfo } from '@/api';
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
const editMode = ref(false);

const form = reactive({ ...defaultForm });

const onAvatarSuccess = (url: string) => {
  form.logo = url;
};
onMounted(async () => {
  const { address } = getAccount();
  const { data } = await getKolInfo({ kolAddress: address });
  Object.assign(form, data);
});

const handleEdit = () => {
  editMode.value = true;
};

const handleCancel = () => {
  editMode.value = false;
};

const onSubmit = async () => {
  const { address } = getAccount();
  const params = toRaw(form);
  params.kolAddress = address;
  try {
    const result = await postKolInfo(params);
    if (result.success) {
      ElMessage.success('submit profile info success');
      // resetForm();
      editMode.value = false;
    } else {
      ElMessage('submit profile info failed');
    }
  } catch (error) {
    ElMessage('submit profile info failed');
  }
};
</script>

<style lang="less" scoped>
.mine-profile {
  .profile {
    display: flex;
    flex-direction: row;
    > img {
      width: 150px;
      height: 150px;
      margin-right: 15px;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .contact {
        a {
          display: inline-block;
          margin: 0 10px;
          color: #fff;
          width: 25px;
          height: 25px;

          &.homepage {
            background: url('@/assets/images/social/icon-1.png') center center no-repeat;
            background-size: contain;
          }
          &.twitter {
            background: url('@/assets/images/social/icon-2.png') center center no-repeat;
            background-size: contain;
          }
          &.discord {
            background: url('@/assets/images/social/icon-3.png') center center no-repeat;
            background-size: contain;
          }
          &.instagram {
            background: url('@/assets/images/social/icon-4.jpg') center center no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>
