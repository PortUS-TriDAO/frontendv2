<template>
  <div class="p-list-item">
    <img
      src="https://dappradar.com/cdn-cgi/image/width=40,quality=100/https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo_3d4ce66580be868d5d1b89a411dcff01.png"
      alt=""
    />
    <div class="item-content">
      <h5>Echo of intensity</h5>
      <p>Dreamed of moonshots but awoke to a capitulation.</p>
      <p-button @click="handleEdit">Edit</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['projectId']);

function handleEdit() {
  const projectId = 234234234;
  router.push(`/project/create/step1/${projectId}`);
}
</script>

<style lang="less" scoped>
.p-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;

  > img {
    width: 200px;
    height: 200px;
    margin-right: 30px;
    border-radius: 10px;
  }

  .item-content {
    > h5 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 18px;
    }

    > p {
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 23px;
    }
  }
}
</style>
