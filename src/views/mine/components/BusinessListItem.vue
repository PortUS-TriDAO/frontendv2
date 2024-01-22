<template>
  <div class="p-b-item">
    <h5>Echo of Intensity</h5>
    <p>Dreamed of moonshots but awoke to a capitulation.</p>
    <p>Applied/Total：56/200</p>
    <div class="options">
      <span>balance: 424234234</span>
      <div>
        <p-button>withdraw</p-button>
        <p-button>submit nft contract</p-button>
      </div>
    </div>

    <div v-if="noNft" class="mask">
      <div class="card">none NFT</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const noNft = ref(false);
</script>

<style lang="less" scoped>
.p-b-item {
  background: #f7f7f7;
  padding: 20px;
  position: relative;

  h5 {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  > p {
    font-size: 24px;
    fontweight: 400;
    line-height: 29px;
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 18px;
    font-size: 24px;

    button {
      width: 160px;
    }
  }

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .card {
      width: 300px;
      line-height: 90px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
