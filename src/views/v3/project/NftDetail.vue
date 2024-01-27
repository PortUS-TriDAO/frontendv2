<template>
  <page-container class="pg-nft-detail">
    <!-- <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div> -->
    <div class="detail-header">
      <div class="detail-header-content">
        <div class="detail-header-bg"></div>
        <div class="right">
          <span v-if="data?.name">Collection Name：{{ data?.name || '' }}</span>
          <!-- <span>Symbol: </span> -->
          <span>Standard: ERC1155</span>
          <!-- TODO: 定制获取data数据错误问题 -->
          <!-- <span>Standard: {{ data?.nftType === 1 ? 'ERC1155' : 'ERC721' }}</span> -->
          <span>Goods: {{ nftList?.rows.length || 0 }}</span>
        </div>
        <div v-if="data?.nftAddress">
          <span>Address: {{ data?.nftAddress || '' }}</span>
        </div>
      </div>
    </div>
    <div class="detail-divider"></div>
    <!-- <div class="list-title">NFT list</div> -->`
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item.id)"
      />
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

// import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useNftDetail, useSkuList, useSpuList } from '@/hooks';

const route = useRoute();
const router = useRouter();

const retailId = Number(route.params.retailId);
const nftType = Number(route.params.nftType);
const { data } = useNftDetail(retailId, nftType);

// const data: NftContractData = {
//   nftAddress: route.query.nftAddress as Address,
//   avatar: route.query.avatar as string,
//   nftID: '',
//   name: '',
//   nftType,
//   // 随意填写一个
//   bizId: 1111,
//   retailAddress: route.query.retailAddress as Address,
//   id: retailId,
// };

const { data: nftList } = nftType === 1 ? useSkuList(retailId) : useSpuList(retailId);

function handleDetail(id: number) {
  if (Number(nftType) === 1) {
    router.push(`/nft/sku/${retailId}/${id}`);
  } else {
    router.push(`/nft/spu/${retailId}/${id}`);
  }
}
</script>
<style lang="less" scoped>
.pg-nft-detail {
  > :deep(article) {
    background: url('./assets/bg.png') no-repeat;
  }
  .detail-header {
    height: 260px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .detail-header-content {
      // position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .detail-header-bg {
        // position: absolute;
        // top: 0;
        // left: 0;
        // z-index: 2;
        width: 443px;
        height: 214px;
        background: url('./assets/sku-bg.png') no-repeat;
        background-size: contain;
        background-position: center;
      }
      .right {
        width: 230px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
  .detail-divider {
    // margin: 20px 0;
    // border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    height: 42px;
    background: url('./assets/divider-bg.png') center center no-repeat;
  }

  // .list-title {
  //   font-size: 24px;
  //   font-weight: 700;
  //   line-height: 28px;
  //   color: #fff;
  //   margin: 0 0 14px 0;
  // }

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 40px;
    row-gap: 40px;
    padding-top: 32px;

    > div {
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    .detail-header {
      height: 150px;
      font-size: 12px;
      .detail-header-content {
        gap: 10px;
        .detail-header-bg {
          width: 270px;
          height: 130px;
        }
        .right {
          width: auto;
        }
      }
    }
    .list {
      grid-template-columns: 1fr 1fr;
      column-gap: 16px;
      row-gap: 16px;
      .sku-item {
        width: 100%;
      }
    }
  }
}
</style>
