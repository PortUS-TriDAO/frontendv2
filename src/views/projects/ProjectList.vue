<template>
  <div class="page-project-list">
    <div class="project-header">
      <span class="page-title">My Projects</span>
      <div>
        <el-input placeholder="Search Name" :prefix-icon="Search"></el-input>
        <el-button type="primary" @click="createProject">Create Project</el-button>
      </div>
    </div>
    <div class="main-container">
      <el-table row-class-name="row-style" :data="tableData">
        <el-table-column prop="pic" label="Pic"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="amount" label="Amount"></el-table-column>
        <el-table-column prop="operator" label="Operator"></el-table-column>
        <el-table-column label="Opeate">
          <template #default>
            <div class="operates">
              <el-button link type="primary" size="small">Withdraw</el-button>
              <el-button link type="primary" size="small">Detail</el-button>
              <el-button link type="primary" size="small">Edit</el-button>
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
import { Search } from '@element-plus/icons-vue'
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
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  },
  {
    pic: '',
    name: 'Axie',
    amount: 10000,
    operator: 'John'
  }
]

function createProject() {
  router.push('/project/create')
}
</script>
<style lang="less">
.project-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1400px;
  height: 36px;
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 16px;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-input {
      margin-right: 14px;
      width: 200px;
    }
    .el-button {
      width: 150px;
      height: 36px;
    }
  }
}
.row-style {
  height: 59px;
  font-size: 16px;
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
</style>
