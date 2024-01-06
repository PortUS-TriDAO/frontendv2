<template>
  <div>
    <el-upload
      v-model:file-list="pictureList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :http-request="onUpload"
      :limit="9"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { UploadFile, UploadProps } from 'element-plus';
import { ref } from 'vue';

import ossClient from '@/utils/ossClient';

defineOptions({
  name: 'UploadPictureList',
});

const emit = defineEmits(['onUpload']);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const pictureList = ref<UploadFile[]>([]);

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const onUpload: UploadProps['on-success'] = async (response, uploadFile) => {
  const filename = response.file.name;
  const result = await ossClient.put('/filename/' + filename, response.file, {
    headers: {
      'x-oss-object-acl': 'public-read',
    },
  });
  await ossClient.putACL('/filename/' + filename, 'public-read');
  emit('onUpload', result.url);
};
</script>

<style lang="less" scoped></style>
