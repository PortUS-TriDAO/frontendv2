<template>
  <div class="page-home">
    <!-- Header Box -->
    <div class="header-box">
      <h2>Monetize Your Influence Instantly</h2>
      <div class="h-content">
        <button class="btn" @click="goToCreate">Acquire Customers</button>
        <button class="btn" @click="goToDistribute">Share to Earn</button>
      </div>
    </div>
    <!-- Operating Mechanism -->
    <section>
      <!-- <h2>Operating Mechanism</h2> -->
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
                  <h3>What is PortUS</h3>
                  <p>
                    PortUS is an NFT smart contract based income sharing network. Project creators
                    can issue Agent License Tokens written with income-sharing strategies, and
                    Agents acquire them as authorizations to sell and earn commissions. It is
                    SEAMLESS, TRANSPARENT, INSTANT, more importantly SECURE.
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
                  <h3>Advantages for Project Agents</h3>
                  <p>
                    Your commercial value is not defined by number of followers, but your ability to
                    monetize your influence. No waiting period for settlement, commissions get paid
                    instantly through smart contracts when sales happen
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
                  <h3>Advantages for Project Providers</h3>
                  <p>
                    Precisely targeting close knit social circles and active influencers' networks
                    for your products, commission-based income sharing means you only pay when real
                    sales happen.
                  </p>
                </div>
                <div class="op-box-icon permissionless"></div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <!-- Our Latest News -->
    <section class="news">
      <h2>Our Latest News</h2>
      <div class="section-content news-content">
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
    <!-- Our Roadmap -->
    <section class="roadmap">
      <h2>Our Roadmap</h2>
      <div class="section-content roadmap-content">
        <div>
          <h3>2023</h3>
          <h4>Q2-Q3</h4>
          <p>Releasing MVP of PortUS for beta testing</p>
        </div>
        <div>
          <h3>2023</h3>
          <h4>Q4</h4>
          <p>Releasing MVP of PortUS for beta testing</p>
        </div>
        <div>
          <h3>2024</h3>
          <h4>Q1</h4>
          <p>
            Launching Purchase-in-App function,and customizable marketing strategies for agents.
          </p>
        </div>
        <div>
          <h3>2024</h3>
          <h4>Q2</h4>
          <p>
            Working with licensed OTC to enable alternative payment methods, introducing multi-layer
            dealership.
          </p>
        </div>
        <div>
          <h3>2024</h3>
          <h4>Q3-Q4</h4>
          <p>Launching Ads-in-App income sharing mechanism.</p>
        </div>
        <div>
          <h3>2025</h3>
          <h4>onwards</h4>
          <p>
            Onboarding physical goods logistic networks for distribution, expanding community and
            eco-system.
          </p>
        </div>
      </div>
    </section>
    <!-- partner -->
    <section class="partners">
      <h2>Cooperative Partners</h2>
      <div class="section-content partners-content">
        <div class="partners-items">
          <h3>Providers</h3>
          <h3>Influencers</h3>
          <h3>Partners</h3>
        </div>
        <img src="@/assets/images/partners.png" />
      </div>
    </section>
    <div class="header-box">
      <h2>Monetize Your Influence Instantly</h2>
      <div class="h-content">
        <button class="btn" @click="goToCreate">Acquire Customers</button>
        <button class="btn" @click="goToDistribute">Share to Earn</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Address } from '@wagmi/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRaw, watch } from 'vue';
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
const state = reactive({
  primaryProjectInfo: {},
});

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
  router.push('/project/create/step1');
}

function goToDistribute() {
  router.push('/mine/participated');
}

const { data: projectInfo } = usePrimaryProjectInfo();
watch(projectInfo, () => {
  if (projectInfo.value && projectInfo.value.length > 0) {
    state.primaryProjectInfo = projectInfo.value[0];
  }
});

async function handleMint() {
  loading.value = true;
  try {
    const { projectAddress, projectId, bizId } = toRaw(state.primaryProjectInfo);
    await projectStore.mint(projectAddress as Address, projectId, bizId);
    ElMessage.success('apply success');
  } catch (error) {
    console.error('apply failed：', error);
    ElMessage.error('apply failed');
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
    width: 230px;
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
    background: url('@/assets/images/home-header-bg.jpg') center center no-repeat;
    background-size: cover;
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    height: 390px;

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
      gap: 160px;
    }

    @media screen and (max-width: 960px) {
      .h-content {
        gap: 100px;
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
        margin-bottom: 40px;
      }

      .h-content {
        flex-direction: column;
        display: flex;
        align-items: center;
        gap: 40px;
      }
    }
    @media screen and (max-width: 600px) {
      > h2 {
        font-size: 26px;
        line-height: 1;
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
    @media screen and (max-width: 800px) {
      > h2 {
        font-size: 26px;
        &::before,
        &::after {
          width: 8px;
          height: 8px;
          margin: 20px;
        }
      }
      > .section-content {
        width: 100%;
        padding-left: 16px;
        padding-right: 16px;
      }
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

      // &.gamification {
      //   background-image: url('@/assets/images/gamification.png');
      // }
    }
  }

  :deep(.el-carousel__container) {
    width: 100%;
    height: 360px;
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

  .roadmap {
    .roadmap-content {
      max-width: 960px;
      display: grid;
      grid-template-columns: auto auto auto;
      padding: 10px;
      gap: 30px;

      > div {
        background: rgba(46, 62, 95, 0.3);
        border: 1px solid rgba(46, 62, 95, 1);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 224px;

        h3 {
          font-size: 36px;
          font-weight: 700;
        }
        h4 {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 16px;
        }
        p {
          font-size: 18px;
          line-height: 24px;
          font-weight: 400;
        }
      }
    }
  }

  .partners {
    background: rgba(1, 7, 30, 1);

    .partners-items {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding-bottom: 32px;
      h3 {
        width: 275px;
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 24px;
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
}
</style>
