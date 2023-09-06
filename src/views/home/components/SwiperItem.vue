<template>
  <div class="page-swiper-item">
    <h5>{{ props.title1 }}</h5>
    <h5>{{ props.title2 }}</h5>
    <p>
      {{ props.desc }}
    </p>
    <div>
      <ul>
        <li v-for="(item, index) in props.list" :key="index">
          <div>
            <h5>{{ item.title }}</h5>
            <div class="divider"></div>
            <p>
              {{ item.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title1: String,
  title2: String,
  desc: String,
  list: Array<{
    title: String
    desc: String
  }>
})
</script>
<style lang="less" scoped>
.page-swiper-item {
  width: 1400px;
  height: 789px;
  background-color: #0e2654;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 90px 80px 90px;
  box-sizing: border-box;
  > h5 {
    font-size: 36px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }
  > p {
    color: #c9c9c9;
    font-size: 20px;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
    margin-top: 30px;
  }
  > div {
    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 1222px;
      margin-top: 70px;
      > li {
        padding: 40px;
        box-sizing: border-box;
        width: 390px;
        height: 366px;
        background-color: #06173a;
        border-radius: 38px;
        h5 {
          font-size: 20px;
          font-weight: 500;
          line-height: 50px;
          font-family: Roboto;
        }
        p {
          // font-size: 16px;
          // line-height: 44px;
          font-size: 15px;
          line-height: 28px;
          color: #c9c9c9;
        }
        .divider {
          width: 310px;
          height: 1px;
          background-color: #1d253e;
          margin-top: 22px;
          margin-bottom: 26px;
        }
      }
    }
  }
}
</style>
