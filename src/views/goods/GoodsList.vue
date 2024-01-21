<template>
  <page-container class="pg-goods-list" title="Goods">
    <div class="goods-list">
      <div
        v-for="item in data?.rows || []"
        :key="item.id"
        class="item-card"
        @click="handleDetail(item.id)"
      >
        <el-image :src="item.imgUrl" fit="contain">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <h3>{{ item.nftName }}</h3>
        <div>{{ item.price }} USDT</div>
      </div>
    </div>
    <no-data v-if="data?.rows && data?.rows?.length === 0" />
  </page-container>
</template>
<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue';
import { getAccount } from '@wagmi/core';
import { useRouter } from 'vue-router';

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
  .goods-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;

    > div {
      cursor: pointer;
      overflow: hidden;
    }
  }
  .item-card {
    background: url('./assets/item-bg.png') center center no-repeat;
    background-size: 150%;
    border-radius: 10px;
    // background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    // border: 1px solid rgba(187, 187, 187, 1);
    height: 285px;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    h3 {
      font-size: 18px;
      text-overflow: ellipsis;
      display: -webkit-inline-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    // .avatar {
    //   height: 100px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   > img {
    //     max-width: 100%;
    //     max-height: 100%;
    //   }
    // }
    button {
      min-width: 76px;
      width: 100px;
      height: 24px;
      font-size: 12px;
    }
    .el-image {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .image-slot {
        font-size: 32px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .goods-list {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
