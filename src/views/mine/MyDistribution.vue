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
          <template #default="scope">
            <div class="operates">
              <el-button :loading="widthdrawLoading" type="primary">Withdraw</el-button>
              <el-button :loading="shareLoading" type="primary" @click="copyShareLink(scope.row)"
                >ShareLink</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { getMyDistributions, generateReferCode } from '@/api'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { getProjectContractFunctions, getRightsContractFunctions } from '@/stores/useContract'
import { getAccount, getNetwork } from '@wagmi/core'
import type { Address } from '@/types'

const { getRights } = getProjectContractFunctions()
const { tokenOfOwnerByIndex } = getRightsContractFunctions()

const { toClipboard } = useClipboard()

const shareLoading = ref(false)
const widthdrawLoading = ref(false)
const state = reactive({
  myDistributions: []
})

onMounted(async () => {
  try {
    const { success, data } = await getMyDistributions({})
    if (success) {
      state.myDistributions = data
    }
  } catch (error) {
    ElMessage.error('request data failed')
  }
})

async function copyShareLink(row) {
  console.log({ row })
  shareLoading.value = true
  const { address } = getAccount()
  const { chain } = getNetwork()
  const projectAddress = row.projectAddress
  const website = row.website
  const rightsContractAddress = (await getRights(projectAddress)) as Address
  const tokenId = await tokenOfOwnerByIndex(rightsContractAddress, address)
  console.log({ tokenId })

  // generate share link
  const { success, data } = await generateReferCode({
    tokenId: Number(tokenId),
    chainId: chain.id,
    contractAddress: projectAddress,
    redirectUrl: website
  })
  if (success) {
    const text = `${window.location.origin}/?refer=${data.referCode}`
    await toClipboard(text)
    ElMessage({
      type: 'success',
      message: `copy success`
    })
  }

  shareLoading.value = false
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
