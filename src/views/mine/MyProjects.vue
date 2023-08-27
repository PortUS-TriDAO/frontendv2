<template>
  <div class="main-width page-project-list">
    <content-header></content-header>
    <div class="main-container project-list-container">
      <el-table row-class-name="row-style" :data="tableData">
        <el-table-column prop="pic" label="Pic">
          <template #default="scope">
            <img class="project-icon" :src="scope.row.pic" alt="" srcset="" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="amount" label="Amount"></el-table-column>
        <el-table-column prop="operator" label="Operator"></el-table-column>
        <el-table-column label="Opeate">
          <template #default>
            <div class="operates">
              <el-button link type="primary" size="small">Withdraw</el-button>
              <el-button link type="primary" size="small" @click="toDetail">Detail</el-button>
              <el-button link type="primary" size="small" @click="toEdit">Edit</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main-width pagination-block">
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
    </div>
  </div>
</template>
<script setup lang="ts">
// import { Search } from '@element-plus/icons-vue'
import ContentHeader from '@/components/ContentHeader.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const tableData = [
  {
    pic: 'https://dashboard-assets.dappradar.com/document/20005/hooked-dapp-other-bsc-logo-166x166_a8c719dcf7a8e5c2de3fe764a465f9fd.png',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: 'https://dashboard-assets.dappradar.com/document/20005/hooked-dapp-other-bsc-logo-166x166_a8c719dcf7a8e5c2de3fe764a465f9fd.png',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: 'https://dashboard-assets.dappradar.com/document/20005/hooked-dapp-other-bsc-logo-166x166_a8c719dcf7a8e5c2de3fe764a465f9fd.png',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  }
]

function createProject() {
  router.push('/project/create')
}
function toDetail() {
  router.push('/project/detail')
}
function toEdit() {
  router.push('/project/create')
}
</script>
<style lang="less">
.page-project-list {
  .project-list-container {
    width: 1400px;
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
    .el-button {
      color: #ff3300;
      font-size: 16px;
      font-weight: 400;
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
