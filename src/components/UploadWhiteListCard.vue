<template>
  <div class="dialog-box">
    <el-dialog width="450px" center v-model="props.visible">
      <template #header>
        <h5>Add a Whitelist Allowlist</h5>
      </template>
      <template #default>
        <el-upload class="upload-demo" :on-progress="handleSuccess" drag>
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">Drop csv file here or <em>click to upload</em></div>
        </el-upload>
        <div class="upload-btns">
          <!--          <slot name="btnbox"></slot>-->
          <el-button>Upload</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { Buffer } from 'buffer';
import { parse } from 'csv-parse/browser/esm';
import { ElMessage, UploadFile, UploadFiles } from 'element-plus';

import { postProjectWhitelist } from '@/api';

const props = defineProps(['visible', 'title', 'projectId', 'bizId']);

function handleSuccess(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(uploadFile.raw);
  reader.onload = function (e) {
    try {
      let res = e.target.result;
      console.log(res);
      let buf = Buffer.from(res as Buffer);
      parse(buf, {}, async (err, data) => {
        // console.log(err, data);
        const datas = data.slice(1, data.length - 1);
        console.log(datas);
        const addresses = datas.map((v) => v[0]);
        console.log('addresses', addresses);
        try {
          const { success, result } = await postProjectWhitelist({
            projectId: props.projectId,
            bizId: props.bizId,
            wls: addresses,
          });
        } catch (e) {
          ElMessage.error('post white list failed');
        }
      });
    } catch (e) {
      ElMessage.error('parse csv failed');
    }
  };
}
</script>

<style lang="less">
.dialog-box {
  width: 450px;

  h5 {
    font-size: 32px;
  }

  .upload-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .el-button {
      width: 100%;
      height: 48px;
      margin: 10px 0;
      background-color: #d2dff7;
      border-radius: 20px;
      color: #2373c0;
      font-size: 18px;
    }
  }

  :deep(.el-dialog) {
    width: 450px;
    border-radius: 40px;
    height: 545px;
  }
}
</style>
