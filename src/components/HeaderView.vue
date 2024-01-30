<template>
  <div class="page-header">
    <div class="header-section">
      <div class="header-container">
        <template v-if="isStore || isAgent">
          <span class="logo" to="/"></span>
          <div v-if="isStore || isAgent" class="agent">
            {{ agentNickName }}
          </div>
          <button v-if="account && (isStore || isAgent)" class="btn-user" @click.stop="gotoGoods()">
            <img src="@/assets/icon-goods.png" />
          </button>
          <w3m-button balance="hide" size="sm">connect</w3m-button>
          <w3m-network-button />
        </template>
        <template v-else>
          <router-link class="logo" to="/"></router-link>
          <div class="menus" ref="elMenu">
            <router-link to="/" @click.stop="switchMenu(true)">
              <el-icon><HomeFilled /></el-icon>
              Home
            </router-link>
            <router-link to="/project/list" @click.stop="switchMenu(true)">
              <el-icon><MessageBox /></el-icon>
              Project
            </router-link>
            <router-link to="/mine/submitted" @click.stop="switchMenu(true)" class="hide-in-mobile">
              <el-icon><Menu /></el-icon>
              My Profile
            </router-link>
            <a class="show-in-mobile">
              <el-icon><Menu /></el-icon>
              My Profile
            </a>
            <div class="my-profile">
              <router-link to="/mine/submitted" @click.stop="switchMenu(true)">
                <el-icon><Collection /></el-icon>
                Project Created
              </router-link>
              <router-link to="/mine/participated" @click.stop="switchMenu(true)">
                <el-icon><Star /></el-icon>
                Participated
              </router-link>
              <router-link to="/mine/store" @click.stop="switchMenu(true)">
                <el-icon><ShoppingBag /></el-icon>
                My Store
              </router-link>
              <router-link to="/mine/profile" @click.stop="switchMenu(true)">
                <el-icon><User /></el-icon>
                profile
              </router-link>
            </div>
            <router-link v-if="!isProd" to="/faucet" @click.stop="switchMenu(true)">
              <el-icon><Lightning /></el-icon>
              Faucet
            </router-link>
            <w3m-button balance="hide" size="small">connect</w3m-button>
            <w3m-network-button />
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
        </template>
      </div>

      <el-dialog
        v-model="networkDialogVisible"
        title="Current Netowrk Not Support"
        width="30%"
        align-center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div style="text-align: center">
          <el-button type="primary" @click="switchChain">Switch Network</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Collection,
  HomeFilled,
  Menu,
  MessageBox,
  ShoppingBag,
  Star,
  User,
} from '@element-plus/icons-vue';
import { getNetwork, switchNetwork, watchNetwork } from '@wagmi/core';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProfile } from '@/hooks';
import { useWalletStore } from '@/stores/useWallet';

const route = useRoute();
const router = useRouter();
const isStore = computed(() => route.path.indexOf('/store') === 0);
const isAgent = computed(() => route.path.indexOf('/goods') === 0);
const isProd = computed(() => ['www.portus.world', 'portus.world'].includes(window.location.host));
const networkDialogVisible = ref(false);

const walletStore = useWalletStore();

const elMenu = ref(null);

watchNetwork((network) => {
  const { chains, chain } = network;
  const chainIds = chains.map((v) => v.id);
  if (!chainIds.includes(chain.id)) {
    console.log('current chain not support');
    networkDialogVisible.value = true;
  } else {
    networkDialogVisible.value = false;
  }
});

function switchMenu(hideForce?: boolean) {
  const el = elMenu.value;
  if (el?.classList) {
    if (el.classList.contains('menus-show') || hideForce === true) {
      el.classList.remove('menus-show');
    } else {
      el.classList.add('menus-show');
    }
  }
}

onMounted(() => {
  document.addEventListener('click', () => {
    switchMenu(true);
  });
});

const account = computed(() => walletStore.state.account);
// const shortAddress = computed(
//   () =>
//     walletStore.state.account &&
//     `${walletStore.state.account.slice(0, 6)}...${walletStore.state.account.slice(-4)}`,
// );

const kolAddress = computed(() => route.params.kolAddress as string);
const profile = useProfile(kolAddress);
const agentNickName = computed(() => {
  return profile?.data?.value?.nickName || 'Agent';
});

function connect() {
  switchMenu(true);
  walletStore.connect();
}
function gotoGoods() {
  router.push('/goods');
}

const switchChain = () => {
  const { chains } = getNetwork();
  switchNetwork({ chainId: chains[0].id });
};
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
    height: 66px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .logo {
      flex-shrink: 0;
      width: 105px;
      height: 32px;
      background: url('@/assets/logo.png') center center no-repeat;
      background-size: contain;
    }

    .agent {
      display: none;
      height: 24px;
      line-height: 24px;
      border-left: 1px solid rgba(187, 187, 187, 1);
      font-size: 18px;
      text-align: center;
      color: #fff;
      width: 90px;
      display: block;
      flex-grow: 1;
      text-align: left;
      margin-left: 18px;
      padding-left: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      gap: 8px;

      @media screen and (max-width: 800px) {
        margin-left: 8px;
        padding-left: 8px;
        font-size: 18px;
      }
    }

    .menus {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;

      a {
        color: #fff;
        opacity: 0.5;
        margin-right: 40px;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .router-link-active {
        opacity: 1;
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
    .btn-user {
      border: none;
      background: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-left: 12px;
      cursor: pointer;
      flex-shrink: 0;
      margin-right: 8px;
    }
  }

  .show-in-mobile {
    display: none !important;
  }
  .my-profile {
    display: none;
  }

  @media screen and (max-width: 800px) {
    .hide-in-mobile {
      display: none !important;
    }
    .show-in-mobile {
      display: block !important;
    }
    .my-profile {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
    }
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
      padding-right: 8px;
      padding-left: 8px;

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

        a {
          display: flex;
          gap: 8px;
          margin-right: 0;
        }
      }

      .menus-show {
        display: block;
      }
    }
  }
  w3m-network-button {
    display: none;
  }
}
</style>
