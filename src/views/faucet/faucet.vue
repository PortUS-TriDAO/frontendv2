<template>
  <main-content>
    <div class="faucet-container">
      <div>
        <span>Mint USDT:</span>
        <p-button :loading="loading" @click="handleMintUSDT">Mint</p-button>
      </div>

      <div>
        <span>Get Matic</span>
        <a href="https://faucet.polygon.technology/">get matic</a>
      </div>
      <div>
        <span>Mint 1155 NFT Address: 0x1592355Ec9c0bd8886142012c668F3735AcE6218</span>
        <a
          target="_blank"
          href="https://mumbai.polygonscan.com/address/0x1592355Ec9c0bd8886142012c668F3735AcE6218#writeContract"
          >Mint NFT</a
        >
      </div>

      <div>
        <span>Mint 721 NFT Address: 0xd27e829502F1933f1C6ee13f7b7afc048cC07A45</span>
        <a
          target="_blank"
          href="https://mumbai.polygonscan.com/address/0xd27e829502F1933f1C6ee13f7b7afc048cC07A45#writeContract"
          >Mint NFT</a
        >
      </div>
    </div>
  </main-content>
</template>

<script setup lang="ts">
import { getAccount, waitForTransaction } from '@wagmi/core';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

import MainContent from '@/components/MainContent.vue';
import { useERC20Contract } from '@/stores/useERC20Contract';

const USDT_CONTRACT_ADDRESS = '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964';

const erc20Contract = useERC20Contract();

const loading = ref(false);

async function handleMintUSDT() {
  loading.value = true;
  try {
    const { address } = getAccount();
    const amount = BigInt(10000) * 10n ** 18n;
    console.log(amount);
    const tx = await erc20Contract.mint(USDT_CONTRACT_ADDRESS, address, amount.toString());
    await waitForTransaction({ hash: tx.hash });
    ElMessage.success('apply success');
  } catch (e) {
    console.error(e);
    ElMessage.error('apply failed');
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="less" scoped>
.faucet-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200px;

  span {
    margin-right: 20px;
  }

  div {
    margin: 10px;
  }
}
</style>
