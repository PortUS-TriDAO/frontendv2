<template>
  <div class="page-project-list">
    <!-- <content-header></content-header> -->
    <div class="project-list-container">
      <el-table row-class-name="row-style" :data="state.myGames">
        <el-table-column prop="icon" label="logo">
          <template #default="scope">
            <img class="project-icon" :src="scope.row.icon" alt="" srcset="" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="website" label="Home Page"></el-table-column>
        <el-table-column prop="amount" label="Amount"></el-table-column>
        <el-table-column label="Opeate">
          <template #default="scope">
            <div class="operates">
              <el-button
                :loading="loading && activeId === scope.row.id"
                type="primary"
                @click="handleWithdraw(scope.row)"
                >Withdraw</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="main-width pagination-block">
      <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getMyGames } from '@/api'
import { getAccount, waitForTransaction } from '@wagmi/core'
import { ElMessage } from 'element-plus'
import { getProjectContractFunctions } from '@/stores/useContract'

const { operatorWithdraw } = getProjectContractFunctions()

const loading = ref(false)
const activeId = ref(0)
const state = reactive({
  myGames: []
})

onMounted(async () => {
  try {
    const { address } = getAccount()
    const result = await getMyGames({ account: address })
    console.log({ result })
    if (result.success) {
      state.myGames = result.data
    }
  } catch (error) {
    ElMessage.error('request data failed')
  }
})

async function handleWithdraw(row) {
  try {
    loading.value = true
    activeId.value = row.id
    const projectAddress = row.projectAddress
    const { address } = getAccount()
    const { hash } = await operatorWithdraw(projectAddress, address)
    await waitForTransaction({ hash })
    ElMessage.success('withdraw success')
  } catch (error) {
    ElMessage.error('withdraw faied')
  } finally {
    loading.value = false
  }
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
