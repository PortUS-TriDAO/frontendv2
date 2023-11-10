<template>
  <div class="pg-mime-spu-detail">
    <div class="banner">
      <img alt="cover" class="bg" :src="data?.cover" />
      <img alt="avatar" class="avatar" :src="data?.avatar || data?.imgUrl" />
      <template v-if="scenes === 'submitted'">
        <p-button v-if="data?.isHide" @click="handleUp">Up</p-button>
        <p-button v-else @click="handleDown">Down</p-button>
      </template>
    </div>
    <div class="detail">
      <h3>{{ data?.name || data?.nftName }}</h3>
      <div>{{ data?.retailAddress }}</div>
      <div>{{ data?.price }} USDT</div>
      <div>unminted NFT</div>
      <div>{{ dayjs(data?.ddl * 1000).format('YYYY-MM-DD HH:mm') }}</div>
    </div>
    <div class="description">
      <div v-if="data?.briefIntro">
        {{ data?.briefIntro }}
      </div>
      <text-ellipsis v-if="data?.description">
        {{ data?.description }}
      </text-ellipsis>
    </div>
    <div class="detail-divider"></div>
    <!-- <div class="list">
      <div class="item">
        <div class="item-detail">
          <h3>Echo of Intensity</h3>
          <p>Dreamed of moonshots but awoke to a capitulation.</p>
          <div class="item-row2">
            <div>
              <label>items:</label>
              <span>136</span>
            </div>
            <div>
              <label>righted/rights:</label>
              <span>56/200</span>
            </div>
          </div>
          <div class="item-action">
            <div>
              <label><strong>Percent for KOL:</strong></label>
              <strong>10%</strong>
            </div>
            <p-button @click="handleDetail('1231313123')">Detail</p-button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import avatar from '@/assets/images/demo-avatar.png';
import { useSpuDetail, useSpuList } from '@/hooks';

import bannerImg from './assets/banner.png';

const route = useRoute();
// const router = useRouter();
const scenes = computed(() => route.meta.scenes);
const spuId = computed(() => Number(route.params.spuId));
// const retailId = computed(() => Number(route.params.retailId));

const { data } = useSpuDetail(spuId);
// const { data: spuList } = useSpuList(retailId.value);
// spuId

// function handleDetail(businessId: string) {
//   const { id } = route.params;
//   router.push(`/project/${id}/${businessId}`);
// }

function handleDown() {
  console.log('handleDown...');
  // const { id } = route.params;
  // router.push(`/project/${id}/${businessId}`);
}
function handleUp() {
  console.log('handleDown...');
  // const { id } = route.params;
  // router.push(`/project/${id}/${businessId}`);
}
</script>
<style lang="less" scoped>
.pg-mime-spu-detail {
  .banner {
    height: 200px;
    overflow: hidden;
    background-color: rgb(4, 1, 14);
    display: flex;
    justify-content: center;
    margin-top: -20px;
    margin-left: -30px;
    margin-right: -30px;
    position: relative;

    .bg {
      width: 100%;
      height: 200px;
    }

    .avatar {
      position: absolute;
      width: 150px;
      height: 150px;
      top: 25px;
      left: 30px;
      z-index: 2;
    }

    > button {
      position: absolute;
      right: 30px;
      bottom: 20px;
      z-index: 2;
    }
  }
  .detail {
    padding: 15px 30px 15px;
    font-size: 24px;
    letter-spacing: 0px;
    line-height: 28px;
    font-weight: 400;
    // height: 280px;
    background: #f7f7f7;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    > img {
      width: 200px;
      height: 200px;
      margin-top: -100px;
    }
    h3 {
      font-weight: 700;
      color: #000000;
      margin-bottom: 16px;
      font-size: inherit;
    }
    p {
      font-size: inherit;
    }
  }
  .description {
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    color: #000000;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
  }
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  .list {
    .item {
      display: flex;
      flex-direction: row;
      gap: 38px;
      padding: 24px 30px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .item-detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
      font-size: 24px;
      letter-spacing: 0px;
      line-height: 29px;
      color: #000000;

      > h3 {
        font-weight: 700;
        font-size: 24px;
      }
      > p {
        font-weight: 400;
      }
      .item-row2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        label {
          margin-right: 4px;
        }
        div:first-child {
          width: 245px;
        }
        strong {
          font-weight: 700;
        }
      }
      .item-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
