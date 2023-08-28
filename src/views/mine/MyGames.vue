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
          <template #default>
            <div class="operates">
              <el-button type="primary">Withdraw</el-button>
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
import { useRouter } from 'vue-router'
import { getMyGames } from '@/api'
import { getAccount } from '@wagmi/core'
import { ElMessage } from 'element-plus'

const state = reactive({
  myGames: []
})

onMounted(async () => {
  try {
    const { address } = getAccount()
    // const result = await getMyGames({ account: address })
    const result = await getMyGames({})
    console.log({ result })
    if (result.success) {
      state.myGames = result.data
    }
  } catch (error) {
    ElMessage.error('request data failed')
  }
})
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
