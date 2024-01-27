<template>
  <page-container class="pg-sku-detail">
    <!-- <div class="sku-detail-header">
      <div class="sku-bg"></div>
      <div></div>
    </div> -->
    <sku-card :loading="loading" v-if="data" :item="data">
      <div class="info">
        <div v-if="data?.isSold" class="sold-out">sold out</div>
        <div v-else-if="data.isHide" class="sold-out">Down</div>
        <p-button class="buy-btn" v-else @click="handleBuy()">Buy Now</p-button>
      </div>
    </sku-card>

    <your-info-confirm
      :visible="yourInfoConfirmVisible"
      @close="yourInfoConfirmVisible = false"
      @submit="handleSubmit"
    ></your-info-confirm>
    <ticket-qrcode
      :content="qrcodeContent"
      :visible="qrcodeVisible"
      @close="qrcodeVisible = false"
    ></ticket-qrcode>
  </page-container>
</template>
<script setup lang="ts">
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElLoading, ElMessage } from 'element-plus';
import { computed, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';

import { getkolRightId } from '@/api';
import { postSkuUpdate } from '@/api/nft';
import SkuCard from '@/components/sku-card/index.vue';
import TicketQrcode from '@/components/TicketQrcode.vue';
import type { RuleForm } from '@/components/your-info-confirm/index.vue';
import YourInfoConfirm from '@/components/your-info-confirm/index.vue';
import { useSkuDetail } from '@/hooks';
import { useERC20Contract } from '@/stores/useERC20Contract';
import { useProjectStore } from '@/stores/useProject';
import type { SkuSpuData } from '@/types';
import { extendsDecimals, toBN } from '@/utils/bn';

const loading = ref(false);
const route = useRoute();
const kolAddress = route.params.kolAddress as string;
const skuId = computed(() => Number(route.params.skuId));
const bizId = Number(route.params.bizId);
const qrcodeContent = ref('');
const qrcodeVisible = ref(false);
// your info
const yourInfoConfirmVisible = ref(false);

// const nftAddress = computed(() => route.params.nftAddress as string);
// const skuId = computed(() => route.params.skuId as string);
const projectStore = useProjectStore();
const erc20Contract = useERC20Contract();

const { data, refetch } = useSkuDetail(skuId);
// const { data: kolRightInfo } = useKolRightId(bizId, kolAddress);

async function handleBuy() {
  yourInfoConfirmVisible.value = true;
}

function handleSubmit(form: RuleForm) {
  console.log('form:', form);
  handleBuyConfirm(data.value as SkuSpuData, form);
}
async function handleBuyConfirm(item: SkuSpuData, form: RuleForm) {
  const formData = toRaw(form);
  const itemInfo = toRaw(item);
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

    const { address: seller } = getAccount();
    const allowance = await erc20Contract.allowance(buyParams.payToken, seller, item.retailAddress);
    if (BigInt(buyParams.payPrice) > BigInt(allowance as string)) {
      // approve ERC20
      const approveTx = await erc20Contract.approve(
        buyParams.payToken,
        item.retailAddress,
        toBN(buyParams.payPrice).multipliedBy(toBN(formData.quantity)).toString(10),
      );
      await waitForTransaction({ hash: approveTx.hash });
    }

    fullScreenLoading.text.value = 'Buy';

    const { success, data: kolRightInfo } = await getkolRightId({ bizId, kolAddress });
    if (!success) {
      throw new Error('getKolRightId error');
    }
    const tx = await projectStore.handleBuyMintedNft(
      item.retailAddress,
      [buyParams],
      kolRightInfo.rightId,
      formData.quantity,
    );
    await waitForTransaction({ hash: tx.hash });
    await postSkuUpdate({ skuId: skuId.value, isSold: true });

    const { ticketToken } = await projectStore.handleTickVerify({
      nftAddress: itemInfo.nftAddress,
      tokenId: itemInfo.tokenId,
      skuId: skuId.value,
      ...formData,
    });
    qrcodeVisible.value = true;
    qrcodeContent.value = ticketToken;

    ElMessage.success('buy success');
  } catch (e) {
    console.error(e);
    ElMessage.error('buy failed');
  } finally {
    loading.value = false;
    fullScreenLoading.close();
    refetch();
  }
}
</script>
<style lang="less" scoped>
.pg-sku-detail {
  // > :deep(article) {
  //   background: url('./assets/bg.png') no-repeat;
  // }
  .info {
    height: 100%;
  }
  .sku-detail-header {
    height: 300px;
  }
  .sku-bg {
    width: 443px;
    height: 214px;
    background: url('./assets/sku-bg.png') no-repeat;
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
  .buy-btn {
    background: linear-gradient(90.06deg, #fb722f -1.7%, #e20000 77.7%) !important;
  }
}
</style>
