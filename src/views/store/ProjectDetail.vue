<template>
  <page-container class="pg-store-project-detail">
    <project-header :project-info="res?.data" :item-count="data?.length" />
    <div class="detail-divider"></div>
    <div v-if="data" class="list">
      <SkuItem
        v-for="item in data || []"
        :key="item.id"
        :item="item"
        @click="handleDetail(item)"
        class="pointer"
      >
        <template v-slot:actions>
          <p-button
            v-if="!(item.isSold || item.isHide)"
            :loading="loading"
            size="small"
            round
            v-on:click="handleBuy(item)"
          >
            Buy Now
          </p-button>
        </template>
      </SkuItem>

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
    </div>
  </page-container>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElLoading, ElMessage } from 'element-plus';
import { ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getkolRightId, getProjectDetail } from '@/api';
import { postSkuUpdate } from '@/api/nft';
import projectHeader from '@/components/project-header/index.vue';
import SkuItem from '@/components/sku-item/index.vue';
import TicketQrcode from '@/components/TicketQrcode.vue';
import type { RuleForm } from '@/components/your-info-confirm/index.vue';
import YourInfoConfirm from '@/components/your-info-confirm/index.vue';
import { useProjectSkuSpu } from '@/hooks';
import { useERC20Contract } from '@/stores/useERC20Contract';
import { useProjectStore } from '@/stores/useProject';
import type { Address, SkuSpuData } from '@/types';
import { extendsDecimals } from '@/utils/bn';

const route = useRoute();
const router = useRouter();
const kolAddress = route.params.kolAddress as Address;
const projectId = Number(route.params.projectId);
// your info
const yourInfoConfirmVisible = ref(false);
const currItemInfo = ref<SkuSpuData>(null);
// qrcode
const qrcodeVisible = ref(false);
const qrcodeContent = ref('');

const { data: res } = useQuery({
  queryKey: ['getProjectDetail', projectId],
  queryFn: () => {
    return getProjectDetail({ projectId: projectId.toString() });
  },
});

const { data, refetch } = useProjectSkuSpu(projectId);

function handleDetail(item: SkuSpuData) {
  // TODO: 暂时去除进入 详情页面
  // if (item.isSku) {
  //   router.push(`/store/${kolAddress}/sku/${item.retailId}/${item.id}/${item.bizId}`);
  // } else {
  //   router.push(`/store/${kolAddress}/spu/${item.retailId}/${item.id}/${item.bizId}`);
  // }
}

const erc20Contract = useERC20Contract();
const loading = ref(false);
const projectStore = useProjectStore();

async function handleBuy(item: SkuSpuData) {
  currItemInfo.value = toRaw(item);
  yourInfoConfirmVisible.value = true;
}

function handleSubmit(form) {
  console.log('form:', form);
  handleBuyConfirm(currItemInfo.value, form);
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
        buyParams.payPrice,
      );
      await waitForTransaction({ hash: approveTx.hash });
    }

    fullScreenLoading.text.value = 'Buy';

    const { success, data: kolRightInfo } = await getkolRightId({ bizId: item.bizId, kolAddress });
    if (!success) {
      throw new Error('getKolRightId error');
    }
    const tx = await projectStore.handleBuyMintedNft(
      item.retailAddress,
      [buyParams],
      kolRightInfo.rightId,
    );
    await waitForTransaction({ hash: tx.hash });
    await postSkuUpdate({ skuId: item.id, isSold: true });

    // try {
    const { ticketToken } = await projectStore.handleTickVerify({
      nftAddress: itemInfo.nftAddress,
      tokenId: itemInfo.tokenId,
      skuId: itemInfo.id,
      ...formData,
    });
    qrcodeVisible.value = true;
    qrcodeContent.value = ticketToken;
    // } catch (e) {
    //   ElMessage.error('fetch ticket info failed');
    // }

    ElMessage.success('buy success');
  } catch (e) {
    console.error(e);
    ElMessage.error('buy failed');
  } finally {
    loading.value = false;
    fullScreenLoading.close();
    refetch();
  }
  // router.push(`/store/${storeId.value}/nft/${nftAddress.value}/${tokenId}`);
}
</script>
<style lang="less" scoped>
.pg-store-project-detail {
  > :deep(article) {
    background: url('./assets/bg.png') no-repeat;
  }
  .list {
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // gap: 12px;
    // grid-template-columns: 1 1 1 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-rows: 286px auto 80px;
    column-gap: 40px;
    row-gap: 40px;

    > div {
      cursor: pointer;
    }
  }

  .detail-divider {
    margin: 20px 0;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
