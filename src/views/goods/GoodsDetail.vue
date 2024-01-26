<template>
  <page-container class="pg-goods-detail" title="Detail">
    <div class="goods-card">
      <!-- <h3>{{ ticketDetail?.nftName }}</h3> -->
      <div class="item-row">
        <el-image :src="ticketDetail?.imgUrl" fit="contain">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="item-right">
          <h3>{{ ticketDetail?.nftName }}</h3>
          <div class="price-action">
            <span>{{ ticketDetail?.price }} USDT</span>
            <!-- <span>{{ ticketDetail.price }} {{ ticketDetail.payToken }}</span> -->
            <p-button @click="showQrCode = true">QR code</p-button>
          </div>
          <div class="detail-item">
            <div>
              <label>Contract Address:</label><span>{{ ticketDetail?.contractAddress }}</span>
            </div>
            <div>
              <label>Token ID:</label><span>{{ ticketDetail?.tokenId }}</span>
            </div>
            <div>
              <label>Token Standard:</label
              ><span>{{ Number(ticketDetail?.nftType) === 1 ? 'ERC1155' : 'ERC721' }}</span>
            </div>
            <div><label>Chain:</label><span>Ethereum</span></div>
          </div>
        </div>
      </div>
      <!-- <p>
        {{ ticketDetail.briefIntro }}
      </p> -->
      <p>
        關於NFT門票：<br />
        1、NFT門票為四日通票，購票觀眾可於2024年4月6日至9日進入位於香港會議展覽中心3FG展廳的活動展區和會議區。<br />
        2、僅支援使用Polygon上的USDT付款購票。購票前請確保您在Polygon上有充足的USDT支付票款，以免購票失敗。<br />
        3、NFT門票一經售出，概不退換。<br />
        4、如您已購買NFT門票，可點擊（https://portus.world/web3-ticket）查看您的電子票二維碼。請將此電子票二維碼提前列印或截屏保存，活動當天需出示電子票二維碼在大會入口處簽到入場。<br />
        5、如有對本次活動或NFT門票有任何疑問，請發送諮詢郵件至w3@blockchainlabs.org.<br /><br />

        About NFT Pass<br />
        1.This is a Four-Day-Pass that will give you the access to both conference and exhibition
        areas of Hong Kong Web3 Festival 2024 from 6-9 Apr. 2024 in Hall3FG, Hong Kong Convention
        and Exhibition Centre.<br />
        2.Payment should be processed with USDT on Polygon. If you do not have such currencies on
        Polygon, please kindly be reminded to get the currencies ready before you make the
        payment.<br />
        3.This NFT pass is non-refundable.<br />
        4.If you have purchase the NFT pass, please click: https://portus.world/web3-ticket for your
        e-ticket. Please print or take a screenshot of the QR code in advance and show it to the
        staff at the event entrance to check in.<br />
        5.If you have any questions about the event or the NFT Pass, please send an email to
        w3@blockchainlabs.org.<br />
      </p>
    </div>
    <div class="qrcode-dialog" v-if="showQrCode">
      <div class="qrcode-dialog-mask" @click="showQrCode = false" />
      <div class="qrcode-dialog-body">
        <div class="qrcode-content">
          <button class="qrcode-dialog-close" @click="showQrCode = false"></button>
          <img :src="ticketDetail?.imgUrl" />
          <h3>{{ ticketDetail?.nftName }} #{{ ticketDetail?.id }}</h3>
          <qrcode-vue
            :value="ticketDetail?.ticketToken"
            :size="200"
            :margin="1"
            id="qrcode-canvas"
          />
          <button class="btn-download" @click="handleDownload">Save QR</button>
          <p>
            您的入場二維碼是進入會場的唯一憑據，請務必妥善保存。您可以將入場二維碼保存至本地設備，或者在入場時通過PortUS上“我的訂單”页面查找到相應的入場二維碼。<br />
            請注意，在入場前轉移該NFT將導致二維碼失效，請不要與他人分享您的二維碼，否則可能會喪失入場資格。 <br /><br />
            Your entry QR code is the only credential permits your access to the venue, so please
            remember to keep it safe. <br />
            You can save the entry QR code to your local device or find it in "My Orders" when
            entering the venue. <br />
            DO NOT transferring the NFT ，otherwise QR code invalid. DO NOT share your QR code ，may
            result in the loss of your entry privilege
          </p>
        </div>
      </div>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { useTicketDetail } from '@/hooks';

const route = useRoute();

const ticketId = Number(route.params.id);

const { data: ticketDetail } = useTicketDetail(ticketId);

const showQrCode = ref(null);

function downloadCanvasAsImage(canvas, filename) {
  let a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename;
  a.dispatchEvent(new MouseEvent('click'));
}

function handleDownload() {
  var canvas = document.getElementById('qrcode-canvas');
  downloadCanvasAsImage(canvas, 'qrcode.png');
}
</script>
<style lang="less" scoped>
.page-container.pg-goods-detail {
  > :deep(article) {
    background: url('./assets/bg.png') no-repeat;
  }
  .goods-card {
    border-radius: 10px;
    // background-color: rgba(255, 255, 255, 1);
    // box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    // border: 1px solid rgba(187, 187, 187, 1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    h3 {
      margin-bottom: 10px;
    }
    :deep(.el-image) {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      :deep(.image-slot) {
        font-size: 32px;
      }
    }
    button {
      min-width: 76px;
      width: 90px;
      height: 26px;
      font-size: 12px;
      padding: 8px;
    }
  }
  .item-row {
    display: flex;
    flex-direction: row;
    gap: 12px;
    .item-right {
      flex-grow: 1;
    }
  }
  .price-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .detail-item {
    line-height: 1.5;
    > div {
      display: flex;
      justify-content: space-between;
    }
    span {
      word-break: break-all;
      text-align: right;
    }
  }
  p {
    line-height: 1.5;
  }

  .qrcode-dialog {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    .qrcode-dialog-mask {
      background-color: #000;
      opacity: 0.85;
      width: 100%;
      height: 100%;
    }
    .qrcode-dialog-close {
      position: absolute;
      z-index: 3;
      right: 12px;
      top: 0;
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icon-close.png');
      border-style: none;
      background-size: 100%;
      cursor: pointer;
    }
    .qrcode-dialog-body {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      padding: 12px;
    }
    .qrcode-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 12px;
      position: relative;
      padding-top: 32px;

      > img {
        height: 90px;
      }
      > h3 {
        text-align: center;
      }
      > canvas {
        background: #fff;
      }

      > .btn-download {
        height: 45px;
        width: 275px;
        line-height: 20px;
        border-radius: 20px;
        background: linear-gradient(
          90.06deg,
          rgba(125, 152, 221, 1) -1.7%,
          rgba(0, 108, 255, 1) 77.7%
        );
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);

        color: #fff;
        font-size: 20px;
        text-align: center;
        font-family: Roboto;
        border: none;
        &:active {
          opacity: 0.85;
        }
      }
      > p {
        font-size: 12px;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .goods-card {
      font-size: 14px;
      :deep(.el-image) {
        width: 200px;
        height: 200px;
      }
      button {
        min-width: 76px;
        width: 90px;
        height: 26px;
        font-size: 16px;
        padding: 8px;
      }
    }
    .detail-item {
      // padding: 20px 0;
      > div {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
