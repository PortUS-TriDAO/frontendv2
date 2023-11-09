<template>
  <div class="page-home">
    <!-- Header Box -->
    <div class="header-box">
      <h2>Monetize Your Influence Instantly</h2>
      <div class="h-content">
        <div class="h-box left-box">
          <h3>Creator</h3>
          <div>
            <p>• Ouick and easy way to distribute tasks</p>
            <p>• Access to adudant traffic cache</p>
            <p>• Efficient profit allocation through DeCPS</p>
          </div>
          <button class="btn" @click="goToCreate">Create</button>
        </div>
        <div class="h-divider"></div>
        <div class="h-box right-box">
          <h3>Distributer</h3>
          <div>
            <p>• Everyone can become incluencer</p>
            <p>• Monetization of private domain traffic</p>
            <p>• Earnings are safe and transparent</p>
          </div>
          <button class="btn" @click="goToDistribute">Referral</button>
        </div>
      </div>
    </div>
    <!-- Operating Mechanism -->
    <section>
      <h2>Operating Mechanism</h2>
      <div class="section-content">
        <el-carousel
          ref="carousel"
          arrow="never"
          :autoplay="false"
          indicator-position="outside"
          :loop="false"
          height="500"
        >
          <el-carousel-item>
            <div class="op-box">
              <div class="op-box-content">
                <div>
                  <h3>DeCPS</h3>
                  <p>
                    By leveraging on the DeCPS mechanism to mint NFT, we help incorporate products
                    to users and empower private domain influencers to swiftly and securely monetize
                    their traffic. At the same time, we return the pricing power of real traffic
                    back to demand and supply sides.
                  </p>
                </div>
                <div class="op-box-icon"></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="op-box">
              <div class="op-box-content">
                <div>
                  <h3>Across mutiple sector and industries</h3>
                  <p>
                    PortUS can provide services for all industry verticals, including but not
                    limited to gaming, ecommerce, art and education, in both web2 and web3
                  </p>
                </div>
                <div class="op-box-icon across-mutiple"></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="op-box">
              <div class="op-box-content">
                <div>
                  <h3>Permissionless</h3>
                  <p>
                    Our goal is to eliminate traditional centralized web 2.0 platforms where a few
                    dominant players control the network and the means of publication and
                    distribution for products. Instead, we envision a new open ecosystem where all
                    members will have equal rights to participate in the formation of the network,
                    publication of products, and obtain distribution rights.
                  </p>
                </div>
                <div class="op-box-icon permissionless"></div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="op-box">
              <div class="op-box-content">
                <div>
                  <h3>Gamification-based incentive system</h3>
                  <p>
                    We will utilize interior gamification to motivate all participants on the
                    platform, including project owners, traffic leaders, and consumers. We will
                    implement gaming features such as user groups, leaderboards, and achievement
                    systems to continuously boost audience engagement, loyalty, and enjoyment.
                  </p>
                </div>
                <div class="op-box-icon gamification"></div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <!-- Satisfies Industry Needs -->
    <section class="satisfies">
      <h2>Satisfies Industry Needs</h2>
      <p>
        The content distribution and traffic monetization demands of larger-scale, smaller-volume
        project creators and traffic leaders.
      </p>
      <div class="satisfies-content">
        <div>
          <h3>creators</h3>
          <p>Demands for Traffic and Cost Control</p>
          <div class="satisfies-devier"></div>
          <ul>
            <li>Adopt CPS</li>
            <li>New form of distributionplatform</li>
            <li>Genuine and authentic traffic</li>
            <li>Reduce TAC</li>
            <li>No need to worry about conversion rates</li>
          </ul>
        </div>
        <div>
          <h3>distributer</h3>
          <p>Private Domain m10n</p>
          <div class="satisfies-devier"></div>
          <ul>
            <li>Income can be verified publically</li>
            <li>Automated clearing and settlement</li>
            <li>Ensure settlement security</li>
            <li>Sustained returns on traffic</li>
            <li>Reduce business cost</li>
          </ul>
        </div>
      </div>
    </section>
    <!-- Latest News -->
    <section class="news">
      <h2>Latest News</h2>
      <div class="news-content">
        <div class="news-actions">
          <button @click="newsIsFirst = true"><img src="./assets/icon-prev.png" /></button>
          <button @click="newsIsFirst = false"><img src="./assets/icon-next.png" /></button>
        </div>
        <div class="news-wrapper" :style="newsIsFirst ? '' : 'transform: translateX(-660px);'">
          <div class="news-card" v-for="(item, index) in news" :key="index">
            <img :src="item.img" alt="img" />
            <h3>{{ item.title }}</h3>
            <div class="flex-between">
              <span>{{ dayjs(item.date).fromNow() }}</span>
              <a :href="item.url" target="_blank">Read Now ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Satisfies Industry Needs -->
    <section class="case">
      <h2>Customer Case</h2>
      <div class="section-content">
        <div class="case-content">
          <div>
            <img src="./assets/case.png" />
            <div style="text-align: center; padding-top: 8px">Brief introduction</div>
          </div>
          <div class="case-detail">
            <h3>RAINBOX SIX OCACA</h3>
            <div>
              <label>Items</label>
              <span style="margin-right: 116px">1,259</span>
              <label>Chain</label>
              <strong>Ethereum</strong>
            </div>
            <div>
              <label>Share precentage:</label>
              <span>xx%</span>
            </div>
            <!-- <button @click="handleMint">Mint</button> -->
            <p-button :loading="loading" @click="handleMint">Mint</p-button>
          </div>
        </div>
      </div>
    </section>
    <!-- Monetize Your Influence Instantly -->
    <section class="monetize">
      <h2>Monetize Your Influence Instantly</h2>
      <h1>Start Earning</h1>
      <div class="section-content">
        <div class="monetize-action">
          <button class="btn">Submit</button>
          <button class="btn">Referral</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Address } from '@wagmi/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ElMessage } from 'element-plus';
import { watch } from 'fs';
import { onMounted, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { statistic } from '@/api';
import { usePrimaryProjectInfo } from '@/hooks';
import { useProjectStore } from '@/stores/useProject';

import news_1 from './assets/news_1.jpg';
import news_2 from './assets/news_2.jpg';
import news_3 from './assets/news_3.jpg';
import news_4 from './assets/news_4.jpg';
import news_5 from './assets/news_5.jpg';
import news_6 from './assets/news_6.jpg';
dayjs.extend(relativeTime);

// import SwiperItem from './components/SwiperItem.vue';
// import { swiperData } from './data';

const route = useRoute();
const router = useRouter();
const carousel = ref(null);
const projectStore = useProjectStore();
const loading = ref(false);

onMounted(async () => {
  const refer = route.query.refer;
  if (!refer) return;
  const { success, data } = await statistic({
    referCode: refer,
  });

  if (success) {
    const redirectURL =
      (data as any).redirectUrl.slice(0, 4) === 'http'
        ? `${(data as any).redirectUrl}?refer=${refer}`
        : `http://${(data as any).redirectUrl}?refer=${refer}`;
    console.log('redirectURL', redirectURL);
    window.location.href = redirectURL;
  }
});

const newsIsFirst = ref(true);
const news = [
  {
    img: news_1,
    title: 'Future Salon 6圆桌全文：如何把用户真正地带入Web3.0？',
    url: 'https://medium.com/@Future3Campus/future-salon-6圆桌全文-如何把用户真正地带入web3-0-fa77bdb01c1b',
    date: '2023-08-22T00:00:00.000Z',
  },
  {
    img: news_2,
    title:
      'Future3 Camp1, the First Cohort of Future3 Campus Kicked off 22–23 July in Hong Kong, China',
    url: 'https://medium.com/@Future3Campus/future3-camp1-the-first-cohort-of-future3-campus-kicks-off-today-in-hong-kong-china-743a2584998c',
    date: '2023-07-23T16:00:00.000Z',
  },
  {
    img: news_3,
    title: 'PortUS专访：从去中心化流量分发到数据平权',
    url: 'https://www.panewslab.com/zh/articledetails/8f009kr95onn.html',
    date: '2023-09-14T10:08:00.000Z',
  },
  {
    img: news_4,
    title: 'PortUS 推出首个基于 NFT 技术的 Web3 流量分发模型',
    url: 'https://www.chaincatcher.com/article/2093782',
    date: '2023-05-25T07:11:00.000Z',
  },
  {
    img: news_5,
    title: 'Our ultimate vision of building PortUS. 我们建设PortUS的最终愿景',
    url: 'https://mirror.xyz/0xac4Ad4cAB7862aA6fC25dC670c166B989e5045ba/ijyCJBClC-Ntdx8omKfto03vKPO_iFSLK7-LmaQ0W5M',
    date: '2023-09-05T00:00:00.000Z',
  },
  {
    img: news_6,
    title: '游戏分发平台 PortUS 宣布采用 Web3 应用层三代币模型',
    url: 'https://foresightnews.pro/tag?tagId=21664&tagName=PortUS',
    date: '2023-04-16T01:48:00.000Z',
  },
];

function goToCreate() {
  router.push('/project/create');
}
function goToDistribute() {
  router.push('/mine/distribution');
}

const { data: primaryProjectInfo } = usePrimaryProjectInfo();

async function handleMint() {
  loading.value = true;
  try {
    const { projectAddress, projectId, bizId } = toRaw(primaryProjectInfo.value);
    await projectStore.mint(projectAddress as Address, projectId, bizId);
  } catch (error) {
    console.error('mint failed：', error);
    ElMessage.error('mint failed');
  } finally {
    loading.value = false;
  }
}

// function changeSwiper(direction) {
//   if (direction === 'left') {
//     carousel.value.prev();
//   } else if (direction === 'right') {
//     carousel.value.next();
//   }
// }
</script>

<style lang="less" scoped>
.page-home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #06173a;
  color: #fff;

  .btn {
    cursor: pointer;
    color: #fff;
    width: 180px;
    height: 50px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 67px;
    background: rgba(145, 175, 251, 0.1);
    border: 1px solid rgba(145, 175, 251, 1);
    backdrop-filter: blur(10px);
  }

  .header-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background: url('@/assets/images/home-header-bg.png') center center no-repeat;
    background-size: cover;
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    padding-top: 114px;
    padding-bottom: 113px;
    > h2 {
      height: 57px;
      font-size: 48px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 56px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      margin-bottom: 56px;
    }
    .h-content {
      max-width: var(--container-max-width);
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      flex-direction: row;
      .h-box {
        color: #fff;
        > h3 {
          font-size: 36px;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 42px;
          margin-bottom: 20px;
        }
        p {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: 400;
        }
      }
      .h-divider {
        width: 164px;
      }
      .left-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p {
          text-align: right;
        }
      }
      .btn {
        margin-top: 28px;
      }
    }
    @media screen and (max-width: 960px) {
      .h-content {
        .h-divider {
          width: 82px;
        }
      }
    }
    @media screen and (max-width: 800px) {
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-top: 50px;
      padding-bottom: 50px;
      > h2 {
        font-size: 26px;
      }
      .h-content {
        flex-direction: column;
        display: flex;
        align-items: center;
        > .h-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            text-align: center;
          }
        }
        .h-divider {
          height: 60px;
        }
      }
    }
  }

  section {
    padding: 50px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > h2 {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 56px;
      text-align: center;
      color: #fff;
      margin-bottom: 32px;
      &::before,
      &::after {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50px;
        background: linear-gradient(90deg, #f6250c 4.69%, #fb722f 95.43%);
        vertical-align: middle;
        margin: 30px 50px;
      }
    }

    > .section-content {
      width: 960px;
    }
  }

  .op-box {
    height: 360px;
    width: 960px;
    padding-top: 88px;
    .op-box-content {
      display: flex;
      flex-direction: row;
      // align-items: center;
      position: relative;
      gap: 20px;
      width: 100%;
      height: 258px;
      border-radius: 16px;
      background: rgba(46, 62, 95, 0.3);
      border: 1px solid #2e3e5f;
      box-sizing: border-box;
      padding: 16px 22px 16px 22px;
      // padding: 16px 390px 16px 22px;

      h3 {
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 34px;
        color: #ffffff;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 32px;
        color: #c9c9c9;
      }
    }

    .op-box-icon {
      // position: absolute;
      // right: 0;
      // bottom: 0;
      transform: translateY(-80px);
      flex-shrink: 0;
      width: 300px;
      height: 300px;
      background: url('@/assets/images/decps.png') center center no-repeat;
      background-size: contain;
      &.across-mutiple {
        background-image: url('@/assets/images/across-mutiple.png');
      }
      &.permissionless {
        background-image: url('@/assets/images/permissionless.png');
      }
      &.gamification {
        background-image: url('@/assets/images/gamification.png');
      }
    }
  }
  :deep(.el-carousel__container) {
    width: 100%;
    height: 360px;
  }

  .satisfies {
    background-color: #01071e;
    > p {
      max-width: 557px;
      font-size: 17px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 31px;
      color: #c9c9c9;
      text-align: center;
      margin-bottom: 32px;
    }
    .satisfies-content {
      display: flex;
      gap: 60px;
      > div {
        width: 450px;
        height: 400px;
        border-radius: 17px;
        background: rgba(46, 62, 95, 0.3);
        border: 1px solid rgba(46, 62, 95, 1);
        padding: 34px 42px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .satisfies-devier {
        margin: 27px 0 20px;
        height: 2px;
        width: 100%;
        background-color: #151d35;
        flex-shrink: 0;
      }
      h3 {
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 36px;
        color: #ffffff;
        margin-bottom: 16px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 18px;
        color: #c9c9c9;
        text-align: center;
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 249px;
        height: 215px;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 43px;
        color: rgba(201, 201, 201, 1);
        text-align: center;
      }
    }
  }

  .news {
    height: 380px;
    background: rgba(0, 13, 45, 1);

    .news-content {
      width: 960px;
      overflow: hidden;
      position: relative;
      margin-top: -14px - 22px;

      .news-actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-bottom: 14px;
        gap: 12px;
        > button {
          background: transparent;
          border-style: none;
          padding: 0;
          width: 22px;
          height: 22px;
          cursor: pointer;
        }
        img {
          width: 22px;
          height: 22px;
        }
      }
    }

    .news-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      gap: 18px;
      width: 2000px;
      transition: transform 0.5s ease-in-out;
    }

    .news-card {
      left: 120px;
      top: 2121px;
      width: 254.95px;
      height: 162px;
      opacity: 1;
      border-radius: 17px;
      border: 1px solid #2e3e5f;
      background: #2e3e5f;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      > img {
        width: 157px;
        height: 91px;
        border-radius: 10px;
        background: #ffc300;
        border: 1px solid #2e3e5f;
      }
      > h3 {
        height: 16px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 15px;
        color: #ffffff;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        color: #c9c9c9;
        text-align: left;
      }
      a {
        font-size: 12px;
        font-weight: 400;
        color: #2a82e4;
        text-align: left;
        cursor: pointer;
      }
    }
  }
  .case-content {
    left: 120px;
    top: 2501px;
    height: 340px;
    opacity: 1;
    background: rgba(46, 62, 95, 0.3);
    border: 1px solid #2e3e5f;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    gap: 32px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }
    .case-detail {
      padding-top: 28px;
      flex-grow: 1;
      position: relative;
      > h3 {
        height: 29px;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 28px;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 24px;
      }
      > div {
        margin-bottom: 24px;
      }
      span,
      strong,
      label {
        width: 125px;
        height: 29px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 28.13px;
        color: #ffffff;
      }
      label {
        margin-right: 8px;
      }
      strong {
        color: rgba(250, 101, 41, 1);
      }
      > button {
        width: 180px;
        height: 50px;
        border-radius: 67px;
        background: linear-gradient(90deg, rgba(251, 114, 47, 1) 0%, rgba(246, 37, 12, 1) 100%);
        backdrop-filter: blur(10px);
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 28px;
        color: #ffffff;
        cursor: pointer;
        border: none;
        position: absolute;
        right: 30px;
        bottom: 16px;
      }
    }
  }

  .monetize {
    background: #01071e;
    padding-top: 95px;
    padding-bottom: 127px;
    h2 {
      margin-bottom: 25px;
    }
    h1 {
      height: 73px;
      font-size: 62px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 72px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 74px;
      margin-top: 0;
    }
    .monetize-action {
      display: flex;
      align-items: center;
      gap: 178px;
      width: 538px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  // .sat-box {
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   background-color: #01071e;
  //   padding-bottom: 140px;
  //   > p {
  //     margin-top: 28px;
  //     margin-bottom: 102px;
  //   }
  //   .sat-content-box {
  //     // min-width: 1400px;
  //     display: flex;
  //     flex-direction: row;
  //     justify-content: space-between;
  //     > div {
  //       width: 50%;
  //       padding: 0 25px;
  //     }
  //     .sat-item-box {
  //       // width: 674px;
  //       height: 606px;
  //       border: solid 2px #2e3e5f;
  //       border-radius: 42px;
  //       padding: 60px 40px 85px;
  //       box-sizing: border-box;
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //       > h5 {
  //         font-weight: 700;
  //         font-size: 36px;
  //         line-height: 36px;
  //       }
  //       > p {
  //         font-size: 20px;
  //         font-weight: 400;
  //         line-height: 36px;
  //       }
  //       .devider {
  //         width: 353px;
  //         height: 1px;
  //         background-color: #151d35;
  //         margin-top: 40px;
  //         margin-bottom: 60px;
  //       }
  //       > ul {
  //         display: flex;
  //         flex-direction: column;
  //         align-items: center;
  //         > li {
  //           font-size: 16px;
  //           line-height: 50px;
  //           font-weight: 400;
  //           color: #f1f1f1;
  //         }
  //       }
  //     }
  //   }
  //   @media screen and (max-width: 800px) {
  //     padding-top: 50px;
  //     padding-bottom: 50px;
  //     padding-left: var(--container-padding-left);
  //     padding-right: var(--container-padding-right);
  //     width: 100%;

  //     .title {
  //       margin: 0;
  //       font-size: 26px;
  //       font-style: normal;
  //       font-weight: 700;
  //       line-height: 40px;
  //       // margin-bottom: 119px;
  //       &::before,
  //       &::after {
  //         margin: 12px;
  //         width: 7px;
  //         height: 7px;
  //       }
  //     }
  //     > p {
  //       margin-top: 10px;
  //       padding-left: 45px;
  //       padding-right: 45px;
  //       font-size: 12px;
  //       font-style: normal;
  //       font-weight: 400;
  //       line-height: 22px;
  //       text-align: center;
  //       margin-bottom: 35px;
  //     }
  //     .sat-content-box {
  //       display: flex;
  //       flex-direction: column;
  //       width: 100%;
  //       > div {
  //         width: 100%;
  //         padding: 15px 0;
  //       }
  //       .sat-item-box {
  //         padding: 35px 16px;
  //         height: auto;
  //         h5 {
  //           font-size: 22px;
  //           font-style: normal;
  //           font-weight: 700;
  //           line-height: 25px;
  //         }
  //         p {
  //           font-size: 13px;
  //           font-style: normal;
  //           font-weight: 400;
  //           line-height: 25px;
  //         }
  //         .devider {
  //           width: 100%;
  //           margin: 20px 0;
  //         }
  //         ul {
  //           display: block;
  //           > li {
  //             font-size: 13px;
  //             font-style: normal;
  //             font-weight: 400;
  //             line-height: 25px;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
