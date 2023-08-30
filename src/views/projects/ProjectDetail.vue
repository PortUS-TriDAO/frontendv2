<template>
  <div class="main-width page-project-detail">
    <img :src="state.banner" alt="" />
    <div class="project-info">
      <img :src="state.icon" alt="" />
      <div class="project-info-detail">
        <h3>{{ state.name }}</h3>
        <span>Stephen Enzo</span>
        <p>{{ state.briefIntro }}</p>
      </div>
    </div>
    <el-divider />
    <p class="project-desc">
      {{ state.description }}
    </p>

    <div class="swiper">
      <el-carousel trigger="click" height="219px">
        <el-carousel-item v-for="item in 1" :key="item">
          <div class="swiper-item-box">
            <img
              width="329"
              height="219"
              v-for="item in state.screenShots"
              :key="item"
              :src="item"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectDetail } from '@/api'
const route = useRoute()

interface IState {
  banner: string
  icon: string
  name: string
  briefIntro: string
  description: string
  screenShots: string[]
}

let state: IState = reactive({
  banner: '',
  icon: '',
  name: '',
  briefIntro: '',
  description: '',
  screenShots: []
})

onMounted(async () => {
  const id = route.params.id
  const result = await getProjectDetail({ id })
  console.log({ result })
  if (result.success) {
    const { data } = result
    state.banner = data.banner
    state.icon = data.icon
    state.name = data.name
    state.description = data.description
    state.screenShots = data.screenShots
  }
})
</script>
<style lang="less">
.page-project-detail {
  min-width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 70px;
  > img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
  }
  .project-info {
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    > img {
      width: 160px;
      height: 160px;
      border-radius: 10px;
      margin-right: 24px;
    }
    &-detail {
      position: relative;
      width: 100%;
      height: 160px;
      > h3 {
        font-size: 28px;
        font-weight: bold;
        line-height: 150%;
        margin-bottom: 9px;
      }
      > span {
        font-size: 20px;
        font-weight: 500;
        line-height: 150%;
        color: #333333;
      }
      > p {
        font-size: 16px;
        font-weight: normal;
        line-height: 150%;
        color: #666;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  .project-desc {
    margin-top: 40px;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  .swiper {
    margin-top: 30px;
    height: 219px;
    .swiper-item-box {
      display: flex;
      flex: 1;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      > img {
        width: 329px;
        height: 219px;
        border-radius: 10px;
        margin: 0 10px;
      }
    }
  }
}
</style>
