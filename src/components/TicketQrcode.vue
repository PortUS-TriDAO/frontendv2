<template>
  <el-dialog title="BuySuccess" v-model="dialogTableVisible" center>
    <div class="qrcode-content">
      <p>Please take a screenshot and save the QR code</p>
      <qrcode-vue :value="content" :size="200"></qrcode-vue>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { computed } from 'vue';

const props = defineProps(['visible', 'content']);
const emit = defineEmits(['close']);

function close() {
  emit('close');
}

const dialogTableVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    if (!value) {
      close();
    }
  },
});
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
