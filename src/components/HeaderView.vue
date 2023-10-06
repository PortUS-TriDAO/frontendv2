<template>
  <div class="page-header">
    <div class="header-section">
      <div class="header-container">
        <router-link class="logo" to="/"></router-link>
        <div class="menus" ref="elMenu">
          <router-link to="/" @click.stop="switchMenu(true)">Home</router-link>
          <router-link to="/project/list" @click.stop="switchMenu(true)">Project</router-link>
          <router-link to="/mine/projects" @click.stop="switchMenu(true)">Mine</router-link>
          <button v-if="!account" @click.stop="connect">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="27.5"
              height="24.000030517578125"
              viewBox="0 0 27.5 24.000030517578125"
              fill="none"
            >
              <g opacity="1" transform="translate(0 0)  rotate(0)">
                <path
                  id="路径 1"
                  fill-rule="evenodd"
                  style="fill: #cccccc"
                  opacity="0"
                  d="M23 7L1.12 8L2.2 2.96C2.55 1.33 4.16 0.29 5.79 0.66L23 4.5L23 7Z"
                ></path>
                <path
                  id="路径 1"
                  style="fill: #ffffff; opacity: 1"
                  d="M23,7h-0.5v-2.5h0.5l-0.1089,0.488l-17.21178,-3.8404c-1.35327,-0.30719 -2.69913,0.56059 -2.99042,1.91716l-1.08,5.04l-0.4889,-0.10476l-0.02283,-0.49948l21.88003,-1zM23.0228,7.49948l-22.52752,1.02959l1.21582,-5.67383c0.40828,-1.90143 2.29327,-3.11329 4.18958,-2.68284l17.59932,3.92687v3.3784z"
                ></path>
                <path
                  id="矩形 1"
                  fill-rule="evenodd"
                  style="fill: #ffffff"
                  opacity="1"
                  d="M4 24L23 24C25.21 24 27 22.21 27 20L27 7.75003C27 5.54003 25.21 3.75003 23 3.75003L4 3.75003C1.79 3.75003 0 5.54003 0 7.75003L0 20C0 22.21 1.79 24 4 24Z"
                ></path>
                <path
                  id="矩形 2"
                  fill-rule="evenodd"
                  style="fill: #fa5c25"
                  opacity="1"
                  d="M19.87 16.5L27 16.5L27 11.25L19.87 11.25C18.42 11.25 17.25 12.42 17.25 13.87L17.25 13.87C17.25 15.32 18.42 16.5 19.87 16.5Z"
                ></path>
                <path
                  id="矩形 2"
                  style="fill: #ffffff; opacity: 1"
                  d="M19.87,16h7.13v0.5h-0.5v-5.25h0.5v0.5h-7.13c-1.1708,0 -2.12,0.9492 -2.12,2.12c0,1.1709 0.9492,2.13 2.12,2.13zM19.87,17c-1.7231,0 -3.12,-1.4068 -3.12,-3.13c0,-1.7231 1.3969,-3.12 3.12,-3.12h7.63v6.25z"
                ></path>
                <path
                  id="圆形 1"
                  fill-rule="evenodd"
                  style="fill: #ffffff"
                  opacity="1"
                  d="M19.88 12.75C19.25 12.75 18.75 13.25 18.75 13.88C18.75 14.5 19.25 15 19.88 15C20.5 15 21 14.5 21 13.88C21 13.25 20.5 12.75 19.88 12.75Z"
                ></path>
              </g>
            </svg>
            <span>Wallet</span>
          </button>
          <button v-else @click.stop>{{ shortAddress }}</button>
        </div>
        <button class="btn-menus" @click.stop="switchMenu()">
          <svg
            width="40"
            height="37"
            viewBox="0 0 40 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 1.73913C0 0.778635 0.778636 0 1.73913 0H38.2609C39.2214 0 40 0.778635 40 1.73913C40 2.69963 39.2214 3.47826 38.2609 3.47826H1.73913C0.778637 3.47826 0 2.69963 0 1.73913ZM0 18.2611C0 17.3006 0.778636 16.522 1.73913 16.522H38.2609C39.2214 16.522 40 17.3006 40 18.2611C40 19.2216 39.2214 20.0002 38.2609 20.0002H1.73913C0.778637 20.0002 0 19.2216 0 18.2611ZM1.73913 33.0435C0.778636 33.0435 0 33.8221 0 34.7826C0 35.7431 0.778637 36.5217 1.73913 36.5217H38.2609C39.2214 36.5217 40 35.7431 40 34.7826C40 33.8221 39.2214 33.0435 38.2609 33.0435H1.73913Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useWalletStore } from '@/stores/useWallet';
const walletStore = useWalletStore();

const elMenu = ref(null);
function switchMenu(hideForce?: boolean) {
  const el = elMenu.value;
  if (el.classList.contains('menus-show') || hideForce === true) {
    el.classList.remove('menus-show');
  } else {
    el.classList.add('menus-show');
  }
}

onMounted(() => {
  document.addEventListener('click', () => {
    switchMenu(true);
  });
});

const account = computed(() => walletStore.state.account);
const shortAddress = computed(
  () =>
    walletStore.state.account &&
    `${walletStore.state.account.slice(0, 6)}...${walletStore.state.account.slice(-4)}`,
);
function connect() {
  switchMenu(true);
  walletStore.connect();
}
</script>
<style lang="less">
.page-header {
  height: 66px;
  background-color: #000d2d;
  .header-container {
    width: var(--container-width);
    max-width: var(--container-max-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    margin: 0 auto;
    line-height: 66px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 105px;
      height: 32px;
      background: url('@/assets/logo.png') center center no-repeat;
      background-size: contain;
    }
    .menus {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;
      > button {
        width: 140px;
        height: 40px;
        font-size: 18px;
        font-weight: 700;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(90deg, rgba(251, 114, 47, 1) 0%, rgba(246, 37, 12, 1) 100%);
        padding: 0 10px;
        display: flex;
        align-items: center;
        > svg {
          margin-right: 22px;
        }
      }
      > a {
        color: #fff;
        opacity: 0.5;
        display: inline-block;
        margin-right: 80px;
      }
    }
    .btn-menus {
      display: none;
      background-color: transparent;
      border-style: none;
      width: 20px;
      height: 20px;
      > svg {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  @media screen and (max-width: 800px) {
    height: 60px;
    .header-section {
      position: fixed;
      width: 100%;
      z-index: 99;
      background-color: #000425;
    }
    .header-container {
      height: 60px;
      align-items: center;
      line-height: 60px;
      position: relative;
      z-index: 9;
      .btn-menus {
        display: block;
      }
      .menus {
        display: none;
        position: absolute;
        top: 60px;
        left: 0px;
        right: 0px;
        z-index: 9;
        padding: 0 20px;
        background-color: #000425;
        > a {
          display: block;
          margin-right: 0;
        }
      }
      .menus-show {
        display: block;
      }
    }
  }
}
</style>
