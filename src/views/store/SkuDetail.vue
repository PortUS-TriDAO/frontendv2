<template>
  <page-container class="pg-sku-detail">
    <sku-card :loading="loading" v-if="data" :item="data">
      <div class="info">
        <div v-if="data?.isSold" class="sold-out">sold out</div>
        <div v-else-if="data.isHide" class="sold-out">Down</div>
        <p-button v-else @click="handleBuy(data)">Buy Now</p-button>
      </div>
    </sku-card>

    <!-- <div class="detail-divider"></div> -->
    <!--    <div class="list-title">Items</div>-->
    <!--    <div class="list">-->
    <!--      <sku-item-->
    <!--        v-for="item in (nftList?.rows || []).filter((item) => item.id !== skuId)"-->
    <!--        :key="item.id"-->
    <!--        :item="item"-->
    <!--        @click="handleDetail(item.id)"-->
    <!--      >-->
    <!--        <template v-slot:actions>-->
    <!--          <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end">-->
    <!--            <p-button-->
    <!--              v-if="!(item.isSold || item.isHide)"-->
    <!--              size="small"-->
    <!--              round-->
    <!--              v-on:click.stop="handleBuy(item)"-->
    <!--            >-->
    <!--              Buy Now-->
    <!--            </p-button>-->
    <!--          </div>-->
    <!--        </template>-->
    <!--      </sku-item>-->
    <!--    </div>-->
  </page-container>
</template>
<script setup lang="ts">
import type { Address } from '@wagmi/core';
import { waitForTransaction } from '@wagmi/core';
import { ElLoading, ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { postSkuUpdate } from '@/api/nft';
import SkuCard from '@/components/sku-card/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import { useKolRightId, useSkuDetail, useSkuList } from '@/hooks';
import { useERC20Contract } from '@/stores/useERC20Contract';
import { useProjectStore } from '@/stores/useProject';
import type { SkuData } from '@/types';
import { extendsDecimals } from '@/utils/bn';

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const kolAddress = route.params.kolAddress as string;
const retailId = Number(route.params.retailId);
const skuId = computed(() => Number(route.params.skuId));
const bizId = Number(route.params.bizId);

// const nftAddress = computed(() => route.params.nftAddress as string);
// const skuId = computed(() => route.params.skuId as string);
const projectStore = useProjectStore();
const erc20Contract = useERC20Contract();

const { data, refetch } = useSkuDetail(skuId);
const { data: nftList } = useSkuList(retailId);
const { data: kolRightInfo } = useKolRightId(bizId, kolAddress);

function handleDetail(id: number) {
  router.push(`/store/${kolAddress}/sku/${retailId}/${id}`);
}

async function handleBuy(skuData: SkuData) {
  loading.value = true;
  const fullScreenLoading = ElLoading.service({
    lock: true,
    text: 'Approve',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  try {
    const buyParams = {
      seller: data.value.seller as Address,
      payToken: data.value.payToken as Address,
      payPrice: extendsDecimals(data.value.price).toString(10),
      nftTokenId: Number(data.value.tokenId),
      deadline: Number(data.value.ddl),
      signature: data.value.signature,
    };

    // approve ERC20
    const approveTx = await erc20Contract.approve(
      buyParams.payToken,
      data.value.retailAddress,
      buyParams.payPrice,
    );
    await waitForTransaction({ hash: approveTx.hash });
    fullScreenLoading.text.value = 'Buy';
    console.log('buy params ===', {
      retailAddress: data.value.retailAddress,
      buyParams: [buyParams],
      tokenId: Number(kolRightInfo.value.rightId),
    });
    const tx = await projectStore.handleBuyMintedNft(
      data.value.retailAddress,
      [buyParams],
      Number(kolRightInfo.value.rightId),
    );
    await waitForTransaction({
      hash: tx.hash,
    });
    await postSkuUpdate({ skuId: Number(skuId.value), isSold: true });
    refetch();
    ElMessage.success('buy success');
  } catch (error) {
    console.error(error);
    ElMessage.error('buy failed');
  } finally {
    loading.value = false;
    fullScreenLoading.close();
  }
}
</script>
<style lang="less" scoped>
.pg-sku-detail {
  .info {
    height: 100%;
  }

  .sold-out {
    width: 130px;
    height: 90px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #fff;
  }

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
    flex-wrap: wrap;
    gap: 12px;

    > div {
      cursor: pointer;
    }
  }
}
</style>
