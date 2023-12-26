<template>
  <page-container class="pg-goods-detail" title="Detail">
    <div class="item-card">
      <h3>Goods name</h3>
      <div class="item-row">
        <div class="avatar">
          <img :src="avatar" />
        </div>
        <div class="item-right">
          <div class="price-action">
            <span>0.028ETH</span>
            <p-button @click="showQrCode = true">QR code</p-button>
          </div>
          <div class="detail-item">
            <div><label>Contract Address:</label><span>0x0012282923132323</span></div>
            <div><label>Token ID:</label><span>12121</span></div>
            <div><label>Token Standard:</label><span>ERC-1155</span></div>
            <div><label>Chain:</label><span>Ethereum</span></div>
          </div>
        </div>
      </div>
      <p>
        A Popper can be used to display some content on top of another. It's an alternative to
        react-popper.
      </p>
    </div>
    <div class="qrcode-dialog" v-if="showQrCode">
      <div class="qrcode-dialog-mask" @click="showQrCode = false" />
      <div class="qrcode-dialog-body">
        <button class="qrcode-dialog-close" @click="showQrCode = false"></button>
        <div class="qrcode-content">
          <h3>Goods name</h3>
          <qrcode-vue :value="qrcode" size="300" margin="1" id="qrcode-canvas" />
          <button @click="handleDownload">Download</button>
        </div>
      </div>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

import avatar from '@/assets/images/demo-avatar.png';
const qrcode =
  '0x00122829231323230x00122829231323230x00122829231323230x00122829231323230x0012282923132323';

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
<style lang="less">
.page-container.pg-goods-detail {
  .item-card {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(187, 187, 187, 1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    .avatar {
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      > img {
        max-width: 100%;
        max-height: 100%;
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
    .qrcode-dialog-mask {
      background-color: rgba(150, 150, 150, 1);
      opacity: 0.65;
      width: 100%;
      height: 100%;
    }
    .qrcode-dialog-close {
      position: absolute;
      z-index: 3;
      right: 12px;
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icon-close.png');
      border-style: none;
      background-size: 100%;
    }
    .qrcode-dialog-body {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      // height: 324px;
      border: 1px solid rgba(187, 187, 187, 1);
      background: #fff;
      padding: 12px;
    }
    .qrcode-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 12px;

      button {
        height: 45px;
        width: 275px;
        line-height: 20px;
        border-radius: 20px;
        background-color: rgba(210, 223, 247, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
        border: 1px solid rgba(255, 255, 255, 1);
        &:active {
          opacity: 0.85;
        }
      }
    }
  }
  @media screen and (min-width: 600px) {
    .item-card {
      font-size: 14px;
      .avatar {
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
      padding: 20px 0;
      > div {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
