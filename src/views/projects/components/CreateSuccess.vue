<template>
  <div class="main-container page-crate-success">
    <div class="icon-success"></div>
    <h5>Create Project Success!</h5>
    <p>You'll be redirected to My Task page in {{ counter }} seconds.</p>
    <p>
      You can continue to <router-link to="/project/create">Create Project</router-link> , or go to
      the <router-link to="/mine/distribution">My Task</router-link> page now.
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const counter = ref(6)
const router = useRouter()

const timer = setInterval(() => {
  counter.value -= 1
  if (counter.value <= 0) {
    clearInterval(timer)
    router.push('/mine/distribution')
  }
}, 1000)
</script>
<style lang="less" scoped>
.page-crate-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-success {
    width: 201px;
    height: 168px;
    background: url('@/assets/images/icon-success.png') center center no-repeat;
    background-size: contain;
    margin-top: 160px;
  }
  > h5 {
    font-weight: 500;
    font-size: 26px;
    line-height: 39px;
    margin-bottom: 40px;
  }
  > p {
    font-size: 18px;
    line-height: 27px;
    color: #666666;
    > a {
      color: #ff0000;
      cursor: pointer;
    }
  }
}
</style>
