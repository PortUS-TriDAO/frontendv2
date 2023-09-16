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
          <div class="swiper-card">
            <div>
              <h5>{{ item.title }}</h5>
              <div class="divider"></div>
              <p>
                {{ item.desc }}
              </p>
            </div>
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
  }>,
})
</script>
<style lang="less" scoped>
.page-swiper-item {
  width: 100%;
  height: 789px;
  background-color: #0e2654;
  border-radius: 42px;
  border: 1px solid #5771b4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 80px 80px 80px;
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
    width: 100%;
    > ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // width: 100%;
      margin-top: 70px;
      > li {
        box-sizing: border-box;
        width: 33.33%;
        padding: 13px;
        .swiper-card {
          background-color: #06173a;
          border-radius: 38px;
          min-height: 366px;
          padding: 40px;
        }
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
          width: 100%;
          height: 1px;
          background-color: #1d253e;
          margin-top: 22px;
          margin-bottom: 26px;
        }
      }
    }
  }
  @media screen and (max-width: 800px) {
    border-radius: 21px;
    padding: 40px 18px 10px;
    height: 100%;
    h5 {
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 25px;
    }
    p {
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
      margin-top: 15px;
    }
    > div > ul {
      margin-top: 15px;
      flex-direction: column;
      > li {
        width: 100%;
        padding: 10px 0;
        .swiper-card {
          min-height: 190px;
          padding: 30px 20px;
          border-radius: 19px;
        }
        h5 {
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 25px;
          text-align: center;
        }
        .divider {
          margin: 15px 0;
        }
        p {
          padding: 0 15px;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 25px;
          text-align: center;
        }
      }
    }
  }
}
</style>
