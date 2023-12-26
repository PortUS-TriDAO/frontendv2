<template>
  <page-container class="pg-goods-list" title="Goods">
    <div class="list">
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
      <div>
        <div class="item-card" @click="handleDetail(111)">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <h3>Goods name</h3>
          <div>0.028ETH</div>
          <p-button>Detail</p-button>
        </div>
      </div>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { getAccount } from '@wagmi/core';
import { useRouter } from 'vue-router';

import avatar from '@/assets/images/demo-avatar.png';
import { useTicketList } from '@/hooks';

const router = useRouter();

const { address } = getAccount();

const { data } = useTicketList(address);

function handleDetail(id: number) {
  router.push(`/goods/${id}`);
}
</script>
<style lang="less">
.page-container.pg-goods-list {
  article {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > div {
      cursor: pointer;
      width: 50%;
      padding: 8px;
      box-sizing: border-box;
    }
  }
  .item-card {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(187, 187, 187, 1);
    height: 226px;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    .avatar {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    button {
      min-width: 76px;
      width: 100px;
      height: 24px;
      font-size: 12px;
    }
  }

  @media screen and (min-width: 600px) {
    .list > div {
      width: 33.33%;
    }
  }
  @media screen and (min-width: 800px) {
    .list > div {
      width: 25%;
    }
  }
}
</style>
