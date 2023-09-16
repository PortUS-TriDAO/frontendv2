<template>
  <div class="page-home">
    <!-- Header Box -->
    <div class="header-box">
      <div>
        <div class="h-box left-box">
          <H5>Creator</H5>
          <div>
            <p>
              <span>• Ouick and easy way to distribute tasks</span>
              <span>• Access to adudant traffic cache</span>
            </p>
            <span>• Efficient profit allocation through DeCPS</span>
          </div>
          <!-- <button @click="goToCreate">Create</button> -->
        </div>
        <div></div>
        <div class="h-box right-box">
          <h5>Distributer</h5>
          <div>
            <p>
              <span>• Everyone can become incluencer</span>
              <span>• Monetization of private domain traffic</span>
            </p>
            <span>• Earnings are safe and transparent </span>
          </div>
          <!-- <button @click="goToDistribute">Referral</button> -->
        </div>
      </div>
      <p class="h-desc">Monetize Your Influence Instantly</p>
    </div>

    <!-- Operating Mechanism -->
    <div class="operating-box">
      <h2 class="title">Operating Mechanism</h2>
      <div class="img-right decps">
        <div>
          <h5>DeCPS</h5>
          <p>
            By leveraging on the DeCPS mechanism to mint NFT, we help incorporate products to users
            and empower private domain influencers to swiftly and securely monetize their traffic.
            At the same time, we return the pricing power of real traffic back to demand and supply
            sides.
          </p>
        </div>
        <div class="icon-box"></div>
      </div>
      <div class="img-left across-mutiple">
        <div class="icon-box"></div>
        <div>
          <h5>Across mutiple sector and industries</h5>
          <p>
            PortUS can provide services for all industry verticals, including but not limited to
            gaming, ecommerce, art and education, in both web2 and web3
          </p>
        </div>
      </div>
      <div class="img-right permiseless">
        <div>
          <h5>Permissionless</h5>
          <p>
            Our goal is to eliminate traditional centralized web 2.0 platforms where a few dominant
            players control the network and the means of publication and distribution for products.
            Instead, we envision a new open ecosystem where all members will have equal rights to
            participate in the formation of the network, publication of products, and obtain
            distribution rights
          </p>
        </div>
        <div class="icon-box"></div>
      </div>
      <div class="img-left gamification">
        <div class="icon-box"></div>
        <div>
          <h5>Gamification-based incentive system</h5>
          <p>
            We will utilize interior gamification to motivate all participants on the platform,
            including project owners, traffic leaders, and consumers. We will implement gaming
            features such as user groups, leaderboards, and achievement systems to continuously
            boost audience engagement, loyalty, and enjoyment.
          </p>
        </div>
      </div>
    </div>

    <!-- Satisfies Industry Needs -->
    <div class="sat-box">
      <h2 class="title">Satisfies Industry Needs</h2>
      <p>
        The content distribution and traffic monetization demands of larger-scale, smaller-volume
        project creators and traffic leaders.
      </p>

      <div class="sat-content-box">
        <div>
          <div class="sat-item-box">
            <h5>creators</h5>
            <p>Demands for Traffic and Cost Control</p>
            <div class="devider"></div>
            <ul>
              <li>Adopt CPS</li>
              <li>New form of distributionplatform</li>
              <li>Genuine and authentic traffic</li>
              <li>Reduce TAC</li>
              <li>No need to worry about conversion rates</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="sat-item-box">
            <h5>distributer</h5>
            <p>Private Domain m10n</p>
            <div class="devider"></div>
            <ul>
              <li>Income can be verified publically</li>
              <li>Automated clearing and settlement</li>
              <li>Ensure settlement security</li>
              <li>Sustained returns on traffic</li>
              <li>Reduce business cost</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Why choose PortUS -->
    <div class="choose-box">
      <h2 class="title">Why choose PortUS</h2>
      <div class="choose-content">
        <div class="arrow arrow-left" @click="changeSwiper('left')"></div>
        <el-carousel
          ref="carousel"
          arrow="never"
          :autoplay="false"
          indicator-position="bottom"
          loop="false"
        >
          <el-carousel-item v-for="(item, index) in swiperData" :key="index">
            <swiper-item
              :title1="item.title1"
              :title2="item.title2"
              :desc="item.desc"
              :list="item.list"
            ></swiper-item>
          </el-carousel-item>
        </el-carousel>
        <div class="arrow arrow-right" @click="changeSwiper('right')"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { statistic } from '@/api'

import SwiperItem from './components/SwiperItem.vue'
import { swiperData } from './data'

const route = useRoute()
const router = useRouter()
const carousel = ref(null)

onMounted(async () => {
  const refer = route.query.refer
  if (!refer) return
  const { success, data } = await statistic({
    referCode: refer,
  })

  if (success) {
    const redirectURL =
      data.redirectUrl.slice(0, 4) === 'http'
        ? `${data.redirectUrl}?refer=${refer}`
        : `http://${data.redirectUrl}?refer=${refer}`
    console.log('redirectURL', redirectURL)
    window.location.href = redirectURL
  }
})

function goToCreate() {
  router.push('/project/create')
}
function goToDistribute() {
  router.push('/mine/distribution')
}

function changeSwiper(direction) {
  if (direction === 'left') {
    carousel.value.prev()
  } else if (direction === 'right') {
    carousel.value.next()
  }
}
</script>
<style lang="less" scoped>
.page-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #06173a;
  color: #fff;
  .header-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    // min-width: 1400px;
    height: 825px;
    background: url('@/assets/images/home-header-bg.png') center center no-repeat;
    background-size: cover;
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    > div {
      max-width: var(--container-max-width);
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      flex-direction: row;
      .h-box {
        color: #fff;
        margin-top: 168px;
        > h5 {
          font-family: Roboto;
          font-weight: 600;
          font-size: 84px;
          line-height: 80px;
        }
        > div {
          margin-top: 34px;
          font-size: 18px;
          line-height: 50px;
        }
        > button {
          cursor: pointer;
          width: 344px;
          height: 84px;
          margin-top: 80px;
          border-radius: 42px;
          border: solid 1px #91affb;
          background: transparent;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
        }
      }
      .left-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 30px;
        div {
          text-align: right;
          span {
            margin-left: 15px;
          }
        }
      }
      .right-box {
        margin-left: 30px;
        div {
          text-align: left;
          span {
            margin-right: 15px;
          }
        }
      }
    }
    .h-desc {
      color: #bcbcbc;
      text-align: center;
      margin-top: 104px;
      font-size: 18px;
      line-height: 50px;
    }
    @media screen and (max-width: 1260px) {
      .left-box,
      .right-box {
        > div {
          > p {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      }
      .left-box > div > p {
        align-items: flex-end;
      }
    }
    @media screen and (max-width: 800px) {
      height: auto;
      width: 100%;
      overflow: hidden;
      > div {
        flex-direction: column;
        .left-box,
        .right-box {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
          h5 {
            font-size: 40px;
            font-style: normal;
            font-weight: 600;
            line-height: 1;
          }
          > div {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 20px;
            > p {
              display: flex;
              flex-direction: column;
              align-items: center;
              > span {
                margin-left: 0;
                margin-right: 0;
                font-size: 14px;
                font-weight: 300;
                line-height: 25px;
              }
            }
            > span {
              font-size: 14px;
              font-weight: 300;
              line-height: 25px;
            }
          }
          > button {
            margin-top: 20px;
            width: 250px;
            height: 45px;
            border-radius: 1000px;
            border: 1.4px solid #91affb;
            background: rgba(24, 51, 104, 0.6);
            backdrop-filter: blur(8px);
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 25px;
          }
        }
        .left-box {
          margin-top: 35px;
        }
        .right-box {
          margin-top: 50px;
        }
      }
      .h-desc {
        margin-top: 25px;
        font-size: 16px;
      }
    }
  }
  .title {
    margin-top: 100px;
    font-weight: 700;
    font-size: 52px;
    line-height: 80px;
    font-family: Roboto;
    text-align: center;
    color: #fff;
    &::before,
    &::after {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50px;
      background: linear-gradient(90deg, #f6250c 4.69%, #fb722f 95.43%);
      vertical-align: middle;
      margin: 30px;
    }
  }

  .operating-box {
    padding-bottom: 216px;
    width: 100%;
    max-width: var(--container-max-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    .img-left,
    .img-right {
      margin-top: 216px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: solid 2px #2e3e5f;
      border-radius: 42px;
      position: relative;
      // width: 1400px;
      height: 377px;
      padding: 84px 80px;
      box-sizing: border-box;
      > div {
        h5 {
          font-size: 36px;
          line-height: 36px;
          font-weight: 700;
        }
        p {
          margin-top: 30px;
          font-weight: 400;
          font-size: 20px;
          line-height: 36px;
          // width: 678px;
          color: #c9c9c9;
          font-family: Roboto;
        }
      }
      .icon-box {
        width: 420px;
        height: 464px;
      }
    }
    .img-left {
      padding-left: 580px;
      // > div {
      //   position: absolute;
      //   right: 80px;
      //   // top: 113px;
      // }
      .icon-box {
        position: absolute;
        left: 86px;
        top: -116px;
      }
    }
    .img-right {
      padding-right: 580px;
      .icon-box {
        position: absolute;
        right: 86px;
        top: -116px;
      }
    }
    .decps {
      .icon-box {
        background: url('@/assets/images/decps.png') center center no-repeat;
        background-size: contain;
      }
    }
    .across-mutiple {
      .icon-box {
        background: url('@/assets/images/across-mutiple.png') center center no-repeat;
        background-size: contain;
      }
    }
    .permiseless {
      .icon-box {
        background: url('@/assets/images/permissionless.png') center center no-repeat;
        background-size: contain;
      }
    }
    .gamification {
      .icon-box {
        background: url('@/assets/images/gamification.png') center center no-repeat;
        background-size: contain;
      }
    }
    @media screen and (max-width: 800px) {
      padding-top: 50px;
      padding-bottom: 50px;
      width: 100%;

      .title {
        margin: 0;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px;
        // margin-bottom: 119px;
        &::before,
        &::after {
          margin: 12px;
          width: 7px;
          height: 7px;
        }
      }

      .img-right,
      .img-left {
        height: auto;
        margin-top: 114px;
        padding: 116px 26px 35px 26px;
        position: relative;
        > .icon-box {
          position: absolute;
          top: 0;
          left: 50%;
          right: auto;
          width: 190px;
          height: 190px;
          flex-shrink: 0;
          transform: translate(-50%, -50%);
        }
        > div {
          position: initial;
          h5 {
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 1;
            text-align: center;
          }
          p {
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 25px;
            width: 100%;
            margin: 0;
            margin-top: 15px;
            color: #c9c9c9;
          }
        }
      }
    }
  }

  .sat-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #01071e;
    padding-bottom: 140px;
    > p {
      margin-top: 28px;
      margin-bottom: 102px;
    }
    .sat-content-box {
      // min-width: 1400px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      > div {
        width: 50%;
        padding: 0 25px;
      }
      .sat-item-box {
        // width: 674px;
        height: 606px;
        border: solid 2px #2e3e5f;
        border-radius: 42px;
        padding: 60px 40px 85px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        > h5 {
          font-weight: 700;
          font-size: 36px;
          line-height: 36px;
        }
        > p {
          font-size: 20px;
          font-weight: 400;
          line-height: 36px;
        }
        .devider {
          width: 353px;
          height: 1px;
          background-color: #151d35;
          margin-top: 40px;
          margin-bottom: 60px;
        }
        > ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          > li {
            font-size: 16px;
            line-height: 50px;
            font-weight: 400;
            color: #f1f1f1;
          }
        }
      }
    }
    @media screen and (max-width: 800px) {
      padding-top: 50px;
      padding-bottom: 50px;
      padding-left: var(--container-padding-left);
      padding-right: var(--container-padding-right);
      width: 100%;

      .title {
        margin: 0;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px;
        // margin-bottom: 119px;
        &::before,
        &::after {
          margin: 12px;
          width: 7px;
          height: 7px;
        }
      }
      > p {
        margin-top: 10px;
        padding-left: 45px;
        padding-right: 45px;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        text-align: center;
        margin-bottom: 35px;
      }
      .sat-content-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        > div {
          width: 100%;
          padding: 15px 0;
        }
        .sat-item-box {
          padding: 35px 16px;
          height: auto;
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
          }
          .devider {
            width: 100%;
            margin: 20px 0;
          }
          ul {
            display: block;
            > li {
              font-size: 13px;
              font-style: normal;
              font-weight: 400;
              line-height: 25px;
            }
          }
        }
      }
    }
  }
  .choose-box {
    height: 1169px;
    background-color: #06173a;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .choose-content {
      margin-top: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      // max-width: var(--container-max-width);
      max-width: 1400px;

      .arrow {
        width: 60px;
        height: 60px;
        border-radius: 50px;
        background-color: #05122d;
        cursor: pointer;
        &-left {
          margin-right: 50px;
          background: url('@/assets/images/arrow-left.png') center center no-repeat;
          background-size: contain;
        }
        &-right {
          margin-left: 50px;
          background: url('@/assets/images/arrow-right.png') center center no-repeat;
          background-size: contain;
        }
      }
    }
    :deep(.el-carousel__indicators) {
      display: none;
    }
    :deep(.el-carousel__container) {
      // width: 1200px;
      width: 100%;
      height: 789px;
    }
    :deep(.el-carousel) {
      width: 100%;
      // height: 789px;
    }
    @media screen and (max-width: 800px) {
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: var(--container-padding-left);
      padding-right: var(--container-padding-right);
      height: auto;

      .choose-content {
        margin-top: 30px;
        .arrow {
          display: none;
        }
        :deep(.el-carousel__indicators) {
          display: block;
        }
      }
      :deep(.el-carousel__container) {
        height: 980px;
      }

      .title {
        margin: 0;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px;
        // margin-bottom: 119px;
        &::before,
        &::after {
          margin: 12px;
          width: 7px;
          height: 7px;
        }
      }
    }
  }
}
</style>
