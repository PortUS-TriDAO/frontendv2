<template>
  <div class="dialog-box">
    <el-dialog width="450px" center v-model="dialogTableVisible">
      <template #header>
        <h5>Add a Airdrop Address List</h5>
      </template>
      <template #default>
        <el-upload class="upload-demo" :on-progress="handleSuccess" drag>
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">Drop csv file here or <em>click to upload</em></div>
        </el-upload>
        <!--        <div class="upload-btns">-->
        <!--          &lt;!&ndash;          <slot name="btnbox"></slot>&ndash;&gt;-->
        <!--          <el-button :loading="loading">Upload</el-button>-->
        <!--        </div>-->
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { waitForTransaction } from '@wagmi/core';
import { Buffer } from 'buffer';
import { parse } from 'csv-parse/browser/esm';
import { ElMessage, type UploadFile, type UploadFiles } from 'element-plus';
import { computed } from 'vue';

import { postProjectAirdropList } from '@/api';
import { useWhiteListRightsContract } from '@/stores/useWhiteListRightsContract';

const whitelistContract = useWhiteListRightsContract();
const props = defineProps(['visible', 'title', 'projectAddress', 'projectId', 'bizId']);
const emit = defineEmits(['success', 'close']);
console.log('UPLOAD AIRDROPS', props);
const dialogTableVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    if (!value) {
      close();
    }
  },
});

function close() {
  emit('close');
}

async function setMerkleRoot(root: string) {
  console.log('root', root);
  try {
    const tx = await whitelistContract.setMerkleRoot(props.projectAddress, root);
    await waitForTransaction(tx);
    ElMessage.success('upload success');
    emit('success');
  } catch (e) {
    ElMessage.error('upload failed');
  }
}

function handleSuccess(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(uploadFile.raw);
  reader.onload = function (e) {
    try {
      let res = e.target.result;
      let buf = Buffer.from(res as Buffer);
      parse(buf, {}, async (err, data) => {
        const datas = data.slice(1, data.length - 1);
        const addresses = datas.map((v) => v[0]);
        try {
          const { success, data: result } = await postProjectAirdropList({
            projectId: props.projectId,
            bizId: props.bizId,
            airdrops: addresses,
          });
          const tx = await whitelistContract.airdrop(props.projectAddress, addresses);
          await waitForTransaction(tx);
          if (success) {
            ElMessage.success('upload airdrop list success');
            emit('success');
          } else {
            ElMessage.error('upload airdrop list failed');
          }
        } catch (e) {
          ElMessage.error('post white list failed');
          emit('close');
        }
      });
    } catch (e) {
      ElMessage.error('parse csv failed');
    }
  };
}
</script>

<style scoped lang="less">
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
