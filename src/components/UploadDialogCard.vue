<template>
  <el-dialog :show-close="false" class="upload-dialog" width="570px" v-model="dialogVisible">
    <template #header>
      <div class="dialog-header">
        <h5>Add a Whitelist Allow List</h5>
        <el-icon @click="close"><CircleClose /></el-icon>
      </div>
    </template>
    <div>
      <el-upload class="upload-demo" drag>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drag and drop a CSV file or <em>select from your computer</em>
        </div>
      </el-upload>
      <div class="btns">
        <el-button>Download CSV template</el-button>
        <el-button>Down</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { CircleClose } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = defineProps(['visible']);
const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    if (!value) {
      close();
    }
  },
});
</script>

<style lang="less">
.upload-dialog {
  background: #274a80 !important;
  width: 570px;
  height: 698px;
  border-radius: 40px;
  .dialog-header {
    display: flex;
    flex-direction: row;
    color: #fff;
    justify-content: space-between;
    font-size: 36px;
    > .el-icon {
      cursor: pointer;
    }
  }
  .el-upload-dragger {
    background: transparent;
    color: #fff !important;
  }
  .btns {
    display: flex;
    flex-direction: column;
    > .el-button {
      margin-top: 20px;
      width: 490px;
      height: 57px;
    }
  }
}
</style>
