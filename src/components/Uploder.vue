<template>
  <el-upload
    class="upload-demo"
    :class="{ 'has-img': state }"
    drag
    action=""
    :http-request="onUpload"
  >
    <img width="200" height="200" v-if="state" :src="state" alt="" />
    <div v-else>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div>
        <slot></slot>
      </div>
    </div>
  </el-upload>
</template>

<script lang="ts" setup>
import { type UploadProps } from 'element-plus';
import { ref } from 'vue';

import ossClient from '@/utils/ossClient';

const props = defineProps({
  onSuccess: Function,
});
const emit = defineEmits(['onSuccess']);

const state = ref('');
const onUpload: UploadProps['onSuccess'] = async (response, uploadFile) => {
  const filename = response.file.name;
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read',
    },
  });
  await ossClient.putACL('/filename/' + filename, 'public-read');
  state.value = result.url;
  console.log('state.value', state.value);
  emit('onSuccess', state.value);
};
</script>

<style lang="less" scoped>
.upload-demo {
  margin-right: 29px;
  width: 200px;
  height: 200px;
}
.has-img {
  :deep(.el-upload-dragger) {
    margin: 0;
    padding: 0;
    height: 200px;
  }
}
</style>
