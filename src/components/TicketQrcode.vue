<template>
  <el-dialog title="BuySuccess" v-model="props.visible" center>
    <div class="qrcode-content">
      <p>Please take a screenshot and save the QR code</p>
      <qrcode-vue :value="content" :size="200"></qrcode-vue>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';

const props = defineProps<{
  visible: Boolean;
  content: String;
}>();
</script>

<style lang="less" scoped>
.qrcode-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
