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
      <el-button @click="mint">Mint</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

export interface IProps {
  data: {
    id: number
    icon: string
    name: string
    briefIntro: string
    minted: boolean
  }
}
const props = defineProps<IProps>()

const router = useRouter()

function onClick() {
  router.push({ name: 'ProjectDetail', params: { id: props.data.id } })
}

function mint(event) {
  console.log('mint', event)
  event.stopPropagation()
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
  cursor: pointer;
  > img {
    display: block;
    width: 236px;
    // height: 236px;
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
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
  .el-button {
    width: 100%;
    color: #fff;
    background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
  }
}
</style>
