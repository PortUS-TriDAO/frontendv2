<template>
  <div class="page-ticket">
    <div class="page-ticket-header">
      <img src="./assets/Feng-Mian-EN.png" alt="Form cover" class="sc-ad761a6f-1 bwKkJz" />
      <!-- <img src="/src/views/web3-ticket/assets/Feng-Mian-EN.png" alt="Form cover" class="sc-ad761a6f-1 bwKkJz"> -->
    </div>
    <div class="page-ticket-content">
      <!-- connect wallet -->
      <template v-if="!address">
        <button class="btn-connect" @click="connectWallet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 27 20.25"
            width="27"
            height="20"
            style=""
            filter="none"
          >
            <g>
              <path
                id="矩形 1-ilpnl2wlai3h02x"
                fill-rule="evenodd"
                style="fill: #ffffff"
                opacity="1"
                d="M4 20.25L23 20.25C25.21 20.25 27 18.46 27 16.25L27 4C27 1.79 25.21 0 23 0L4 0C1.79 0 0 1.79 0 4L0 16.25C0 18.46 1.79 20.25 4 20.25Z"
                fill="rgba(164,173,179,1)"
              ></path>
            </g>
          </svg>
          <span>Connect Wallet</span>
        </button>
        <p>
          請點撃連接您的錢包以快速獲取您的入場二维碼 <br />
          Please click the button to connect your wallet and obtain your entry QR code swiftly.
        </p>
      </template>
      <!-- qrcode -->
      <template v-else-if="!!ticketToken">
        <qrcode-vue :value="ticketToken" :size="300" :margin="1" id="qrcode-canvas" />
        <p>
          請向檢票员出示此二维碼，通過驗證後入場<br />
          Please present the QR code for <br />
          verification and entrance.
        </p>
      </template>
      <!-- no data -->
      <template v-else>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="64 64 896 896"
            width="100"
            height="100"
            style=""
            filter="none"
          >
            <g>
              <path
                d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
                fill="rgba(245,243,243,1)"
              ></path>
              <path
                d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                fill="rgba(245,243,243,1)"
              ></path>
            </g>
          </svg>
        </i>
        <p>
          您當前連接的位址没有門票NFT<br />
          ,請確認您的持有地址 <br /><br />
          The address you are connected to does not have a ticket NFT. Please verify the address.
        </p>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAccount, watchAccount } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

import { useTicketToken } from '@/hooks';

defineOptions({
  name: 'ticketPage',
});

const account = getAccount();
const web3Modal = useWeb3Modal();

const address = ref(account.address);

const unwatch = watchAccount((account) => {
  address.value = account.address;
});

function connectWallet() {
  web3Modal.open();
}

const { data: ticketToken } = useTicketToken(address);
</script>
<style lang="less">
* {
  box-sizing: border-box;
}
.page-ticket {
  // width: 960px;
  // margin-left: auto;
  // margin-right: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #06173a;

  .page-ticket-header {
    // height: 157px;
    // background: url('./assets/header-bg.png') no-repeat;
    > img {
      display: block;
      object-fit: cover;
      object-position: center 37.5892%;
      width: 100%;
      height: 25vh;
    }
  }
  .page-ticket-content {
    background: #06173a url('./assets/ticket-bg.png') no-repeat center top;
    background-size: 100%;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    gap: 50px;

    p {
      line-height: 30px;
      color: rgba(255, 255, 255, 1);
      font-size: 24px;
      text-align: center;
      width: 538px;
    }
  }

  .btn-connect {
    width: 338px;
    height: 94px;
    line-height: 20px;
    border-radius: 20px;
    background: linear-gradient(90.06deg, rgba(125, 152, 221, 1) -1.7%, rgba(0, 108, 255, 1) 77.7%);
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-style: none;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    .btn-connect {
      height: 64px;
      width: 300px;
    }
    .page-ticket-content {
      padding-left: 24px;
      padding-right: 24px;
    }
    p {
      font-size: 20px;
      width: auto !important;
    }
  }
}
</style>
