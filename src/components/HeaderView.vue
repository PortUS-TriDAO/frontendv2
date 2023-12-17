<template>
  <div class="page-header">
    <div class="header-section">
      <div class="header-container">
        <router-link class="logo" to="/"></router-link>
        <div v-if="isAgent" class="agent">agent</div>
        <div class="menus" ref="elMenu">
          <div v-if="isStore" style="height: 66px"></div>
          <template v-else>
            <router-link to="/" @click.stop="switchMenu(true)">Home</router-link>
            <router-link to="/project/list" @click.stop="switchMenu(true)">Project</router-link>
            <router-link to="/mine/submitted" @click.stop="switchMenu(true)"
              >My Profile</router-link
            >
            <router-link to="/faucet" @click.stop="switchMenu(true)">Faucet</router-link>
          </template>
          <!-- <button v-if="!account" @click.stop="connect">connect</button>
          <button v-else @click.stop>{{ shortAddress }}</button> -->
          <w3m-button>connect</w3m-button>
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
import { useRoute } from 'vue-router';

import { useWalletStore } from '@/stores/useWallet';

const route = useRoute();
const isStore = computed(() => route.path.indexOf('/store') === 0);
const isAgent = computed(() => route.path.indexOf('/goods') === 0);

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
  background-color: #000425;
  z-index: 999;

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

    .agent {
      height: 24px;
      line-height: 24px;
      border-left: 1px solid rgba(187, 187, 187, 1);
      font-size: 22px;
      text-align: center;
      color: #fff;
      width: 90px;
      display: block;
      flex-grow: 1;
      text-align: left;
      margin-left: 18px;
      padding-left: 18px;
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
        //margin-right: 80px;
        margin-right: 50px;
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
