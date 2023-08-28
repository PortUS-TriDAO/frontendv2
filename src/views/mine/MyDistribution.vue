<template>
  <div class="page-project-list">
    <!-- <content-header></content-header> -->
    <div class="project-list-container">
      <el-table row-class-name="row-style" :data="state.myDistributions">
        <el-table-column prop="icon" label="Logo">
          <template #default="scope">
            <img class="project-icon" :src="scope.row.icon" alt="" srcset="" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="amount" label="Amount"></el-table-column>
        <el-table-column prop="website" label="Home Page"></el-table-column>
        <el-table-column label="Opeate">
          <template #default>
            <div class="operates">
              <el-button type="primary">Withdraw</el-button>
              <el-button type="primary" @click="copyShareLink">ShareLink</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getMyDistributions } from '@/api'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()

const state = reactive({
  myDistributions: []
})

onMounted(async () => {
  try {
    const result = await getMyDistributions({})
    if (result.success) {
      state.myDistributions = result.data
    }
  } catch (error) {
    ElMessage.error('request data failed')
  }
})

function copyShareLink() {
  // 复制到剪切板
  toClipboard('')
}
</script>
<style lang="less">
.page-project-list {
  width: 1135px;
  .project-list-container {
    width: 1135px;
  }
  .row-style {
    height: 59px;
    font-size: 16px;
    .project-icon {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
  .operates {
    display: flex;
    flex-direction: row;
    .el-button {
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      border: none;
      background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
    }
  }
  .pagination-block {
    margin-top: 30px;
    margin-bottom: 78px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
