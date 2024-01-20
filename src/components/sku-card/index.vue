<template>
  <div
    :class="[
      'sku-card',
      {
        'sku-card--small': size === 'small',
      },
    ]"
  >
    <div class="detail-card">
      <el-image :src="item.avatar || item.imgUrl" fit="contain">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="card-desc">
        <h3>{{ item?.name || item.nftName }} #{{ item.tokenId }}</h3>
        <!-- <div>{{ item.soldAmount }}/{{ item.sellAmount }}</div> -->

        <div class="countdown">
          <div>
            <span>{{ countdown.days }}</span>
            <label>Days</label>
          </div>
          <div>
            <span>{{ countdown.hours }}</span>
            <label>Hours</label>
          </div>
          <div>
            <span>{{ countdown.minutes }}</span>
            <label>Minutes</label>
          </div>
        </div>
        <div>{{ item.price }} USDT</div>
        <div style="color: #f98506">
          Sales ends {{ item.ddl ? dayjs(item.ddl * 1000).format('YYYY-MM-DD HH:mm') : '' }}
        </div>
        <div class="card-action">
          <slot></slot>
        </div>
      </div>
    </div>
    <p>
      關於NFT門票：<br />
      1、NFT門票為四日通票，購票觀眾可於2024年4月6日至9日進入位於香港會議展覽中心3FG展廳的活動展區和會議區。<br />
      2、僅支援使用Polygon上的USDT付款購票。購票前請確保您在Polygon上有充足的USDT支付票款，以免購票失敗。<br />
      3、NFT門票一經售出，概不退換。<br />
      4、如您已購買NFT門票，可點擊（https://portus.world/web3-ticket）查看您的電子票二維碼。請將此電子票二維碼提前列印或截屏保存，活動當天需出示電子票二維碼在大會入口處簽到入場。<br />
      5、如有對本次活動或NFT門票有任何疑問，請發送諮詢郵件至w3@blockchainlabs.org.<br /><br />

      About NFT Pass<br />
      1.This is a Four-Day-Pass that will give you the access to both conference and exhibition
      areas of Hong Kong Web3 Festival 2024 from 6-9 Apr. 2024 in Hall3FG, Hong Kong Convention and
      Exhibition Centre.<br />
      2.Payment should be processed with USDT on Polygon. If you do not have such currencies on
      Polygon, please kindly be reminded to get the currencies ready before you make the payment.<br />
      3.This NFT pass is non-refundable.<br />
      4.If you have purchase the NFT pass, please click: https://portus.world/web3-ticket for your
      e-ticket. Please print or take a screenshot of the QR code in advance and show it to the staff
      at the event entrance to check in.<br />
      5.If you have any questions about the event or the NFT Pass, please send an email to
      w3@blockchainlabs.org.<br />
    </p>
  </div>
</template>
<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { reactive } from 'vue';

import type { SkuData } from '@/types';

defineOptions({ name: 'SkuItem' });
const props = defineProps<{ item: SkuData; size?: 'small' }>();
const emit = defineEmits(['buy']);

function buy(item: SkuData) {
  emit('buy', item);
}

const countdown = reactive({
  days: '00',
  hours: '00',
  minutes: '00',
});

function toPadNumber(value: number) {
  return parseInt(value.toString(), 10).toFixed().padStart(2, '0');
}

let interval: any;
const computeCountdown = () => {
  const leftTime = props.item.ddl - parseInt((Date.now() / 1000).toFixed(), 10);
  if (leftTime <= 0) {
    clearInterval(interval);
  } else {
    countdown.days = toPadNumber(leftTime / (3600 * 24));
    countdown.hours = toPadNumber((leftTime % (3600 * 24)) / 3600);
    countdown.minutes = toPadNumber((leftTime % 3600) / 60);
  }
};
interval = setInterval(computeCountdown, 1000);
computeCountdown();
</script>
<style lang="less">
.sku-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;

  .detail-card {
    display: flex;
    gap: 26px;
    padding: 10px;
    margin-bottom: 18px;

    .el-image {
      width: 450px;
      height: 450px;
      border-radius: 20px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('./assets/bg.png') center no-repeat;
      background-size: 120% 120%;
      .image-slot {
        font-size: 64px;
      }
    }

    .card-desc {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-top: 10px;
    }

    h3 {
      font-weight: 500;
      font-size: 24px;
    }

    .countdown {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 40px;
      row-gap: 40px;
      padding: 50px 0;
      > div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  p {
    font-size: 14px;
    line-height: 1.8;
    font-weight: 400;
  }

  .card-action {
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .sold-out {
    width: 130px;
    height: 90px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #fff;
  }

  &.sku-card--small {
    .detail-card > img {
      width: 100px;
      height: 100px;
    }

    .detail-card .card-desc {
      gap: 10px;
    }
  }
  @media (max-width: 768px) {
    .detail-card {
      padding: 0;
      font-size: 14px;
      line-height: 1.5;
      gap: 10px;
      .el-image {
        width: 190px;
        height: 190px;
      }
      h3 {
        font-size: 16px;
      }
      .countdown {
        padding: 0;
        row-gap: 10px;
        column-gap: 10px;
        font-size: 12px;
      }
      .card-desc {
        padding: 0;
        gap: 10px;
      }
      .card-action {
        button {
          min-width: auto !important;
          width: 100% !important;
          font-size: 16px !important;
        }
      }
    }
  }
}
</style>
