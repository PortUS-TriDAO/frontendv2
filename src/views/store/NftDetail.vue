<template>
  <page-container class="pg-store-nft-detail">
    <nft-contract-item v-if="data" :item="data" @onDetail="handleDetail" hideActions />
    <div class="detail-divider"></div>
    <div class="list-title">NFT list</div>
    <div class="list">
      <SkuItem
        v-for="item in nftList?.rows || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item)"
      >
        <template v-slot:actions>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end">
            <p-button
              v-if="!(item.isSold || item.isHide)"
              :loading="loading"
              size="small"
              round
              v-on:click="handleBuy(item)"
            >
              Buy Now
            </p-button>
          </div>
        </template>
      </SkuItem>
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElLoading, ElMessage } from 'element-plus';
import { ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { postSkuUpdate } from '@/api/nft';
import NftContractItem from '@/components/nft-contract-item/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useKolRightId, useNftDetail, useSkuList, useSpuList } from '@/hooks';
import { useERC20Contract } from '@/stores/useERC20Contract';
import { useProjectStore } from '@/stores/useProject';
import { type Address, type NftContractData, NftType, type SkuData, type SpuData } from '@/types';
import { extendsDecimals } from '@/utils/bn';

const projectStore = useProjectStore();
const erc20Contract = useERC20Contract();
const route = useRoute();
const router = useRouter();
const kolAddress = route.params.kolAddress as Address;
const retailId = Number(route.params.retailId);
const nftType = Number(route.params.nftType);
const retailerAddress = route.query.retailAddress as Address;
const bizId = Number(route.query.bizId);
const nftAddress = route.query.nftAddress as Address;

const loading = ref(false);
const data: NftContractData = {
  nftAddress: nftAddress,
  avatar: route.query.avatar as string,
  nftID: '',
  name: '',
  nftType,
  // 随意填写一个
  bizId: 1111,
  retailAddress: route.query.retailAddress as Address,
  id: retailId,
};
const { data: nftList } =
  nftType === NftType.SKU ? useSkuList(retailId, 1, 25) : useSpuList(retailId);
const { data: kolRightInfo } = useKolRightId(bizId, kolAddress);

function handleDetail(item: any) {
  if (nftType === NftType.SKU) {
    router.push(`/store/${kolAddress}/sku/${retailId}/${item.id}/${bizId}`);
  } else {
    router.push(`/store/${kolAddress}/spu/${retailId}/${item.id}/${bizId}`);
  }
}

async function handleBuy(item: SkuData | SpuData) {
  const itemInfo = toRaw(item);
  // loading.value = true;

  const fullScreenLoading = ElLoading.service({
    lock: true,
    text: 'Approve',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const buyParams = {
      seller: itemInfo.seller,
      payToken: itemInfo.payToken,
      payPrice: extendsDecimals(itemInfo.price).toString(10),
      sellAmount: itemInfo.sellAmount,
      nftTokenId: itemInfo.tokenId,
      deadline: itemInfo.ddl,
      signature: itemInfo.signature,
    };
    console.log('buy params', buyParams);

    // approve ERC20
    const approveTx = await erc20Contract.approve(
      buyParams.payToken,
      retailerAddress,
      buyParams.payPrice,
    );
    await waitForTransaction({ hash: approveTx.hash });

    fullScreenLoading.text.value = 'Buy';
    const tx = await projectStore.handleBuyMintedNft(
      retailerAddress,
      [buyParams],
      kolRightInfo.value.rightId,
      1,
    );
    await waitForTransaction({ hash: tx.hash });
    // await projectStore.handleTickVerify(nftAddress, itemInfo.tokenId, item.id);
    await postSkuUpdate({ skuId: item.id, isSold: true, soldAmount: 1 });
    ElMessage.success('buy success');
  } catch (e) {
    console.error(e);
    ElMessage.error('buy failed');
  } finally {
    loading.value = false;
    fullScreenLoading.close();
  }
  // router.push(`/store/${storeId.value}/nft/${nftAddress.value}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-store-nft-detail {
  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }

  .list-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
    margin: 0 0 14px 0;
  }

  .list {
    display: flex;
    flex-direction: row;
    gap: 12px;

    > div {
      cursor: pointer;
    }
  }
}
</style>
