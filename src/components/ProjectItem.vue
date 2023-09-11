<template>
  <div class="project-item" @click="onClick">
    <img :src="props.data.icon" alt="" />
    <h3>{{ props.data.name }}</h3>
    <!-- <span>About Farmers</span> -->
    <el-divider />
    <p>
      {{ $props.data.briefIntro }}
    </p>
    <div>
      <el-button class="item-mint-btn" @click="showDialog">Mint</el-button>
    </div>

    <el-dialog @click="onClosed" v-model="dialogVisible" :close-on-click-modal="false" with="50%">
      <div class="dialog-box">
        <div class="detail-info">
          <img :src="props.data.icon" alt="" />
          <div>
            <h5>{{ props.data.name }}</h5>
            <p>Percent: 90%</p>
          </div>
        </div>
        <p>
          {{ $props.data.briefIntro }}
        </p>
        <el-button :loading="loading" class="mint-btn" @click="mint">Mint</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProjectContractFunctions } from '@/stores/useContract'
import type { Address } from '@/types'
import { ElMessage } from 'element-plus'
import { waitForTransaction } from '@wagmi/core'
import { postProjectMint } from '@/api'
import { getAccount } from '@wagmi/core'

const { referrerSign } = getProjectContractFunctions()
const loading = ref(false)
const dialogVisible = ref(false)

export interface IProps {
  data: {
    id: number
    icon: string
    name: string
    briefIntro: string
    minted: boolean
    projectAddress: Address
  }
}
const props = defineProps<IProps>()

const router = useRouter()

function onClick() {
  router.push({ name: 'ProjectDetail', params: { id: props.data.id } })
}

function onClosed(event) {
  event.stopPropagation()
}

async function mint(event) {
  event.stopPropagation()
  try {
    loading.value = true
    const { address } = getAccount()
    const { hash } = await referrerSign(props.data.projectAddress!)
    await waitForTransaction({ hash })
    await postProjectMint({
      projectId: props.data.id,
      account: address
    })
    ElMessage.success('Mint Success')
  } catch (error) {
    ElMessage.error('Mint failed')
  } finally {
    loading.value = false
  }
}

function showDialog(event) {
  console.log('showDialog+++', event)
  event.stopPropagation()
  dialogVisible.value = true
}
</script>
<style lang="less" scoped>
.project-item {
  width: 264px;
  height: 456px;
  border-radius: 10px;
  background-color: #fff;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  > img {
    display: block;
    width: 236px;
    height: 236px;
    border-radius: 10px;
    margin: 0 auto;
  }
  > h3 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
  .el-divider--horizontal {
    margin: 10px 0px;
  }
  > span {
    font-size: 12px;
    line-height: 18px;
    color: #666666;
  }
  > p {
    margin-bottom: 16px;
    font-size: 14px;
    color: #666666;
    height: 83px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
  .el-button {
    width: 236px;
    color: #fff;
    background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
  }
  .item-mint-btn {
    position: absolute;
    left: 14px;
    bottom: 14px;
  }
}

.dialog-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  // text-align: center;
  .detail-info {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    > img {
      width: 120px;
      height: 120px;
    }
    > div {
      height: 120px;
      width: 100%;
      margin-left: 24px;
      position: relative;
      > h5 {
        position: absolute;
        left: 0;
        top: 11px;
        font-size: 28px;
        font-weight: 700;
        line-height: 42px;
        color: #000;
      }
      > p {
        position: absolute;
        left: 0;
        bottom: 14px;
        font-size: 20px;
        line-height: 30px;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  > p {
    width: 100%;
    margin-top: 17px;
    font-size: 16px;
    line-height: 24px;
    color: #666;
  }
  .mint-btn {
    margin-top: 40px;
  }
}
</style>
