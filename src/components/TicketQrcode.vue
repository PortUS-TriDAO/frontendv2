<template>
  <el-dialog
    modal-class="tick-qrcode-mask"
    class="tick-qrcode-dialog"
    v-model="dialogTableVisible"
    center
  >
    <div slot="title" style="text-align: center">
      <img src="@/assets/images/passcard.png" style="height: 90px" />
    </div>
    <div class="qrcode-content">
      <h3>Please take a screenshot and save the QR code</h3>
      <qrcode-vue :value="content" :size="200" :margin="1" id="qrcode-canvas"></qrcode-vue>
      <button class="btn-download" @click="handleDownload">Save QR</button>
      <p>
        關於NFT門票：<br />
        1、NFT門票為四日通票，購票觀眾可於2024年4月6日至9日進入位於香港會議展覽中心3FG展廳的活動展區和會議區。<br />
        2、僅支援使用Polygon上的USDT付款購票。購票前請確保您在Polygon上有充足的USDT支付票款，以免購票失敗。<br />
        3、NFT門票一經售出，概不退換。<br />
        4、如您已購買NFT門票，可點擊（https://portus.world/web3-ticket）查看您的電子票二維碼。請將此電子票二維碼提前列印或截屏保存，活動當天需出示電子票二維碼在大會入口處簽到入場。<br />
        5、如有對本次活動或NFT門票有任何疑問，請發送諮詢郵件至w3@blockchainlabs.org.<br /><br />

        About NFT Pass<br />
        1.This is a Four-Day-Pass that will give you the access to both conference and exhibition
        areas of Hong Kong Web3 Festival 2024 from 6-9 Apr. 2024 in Hall3FG, Hong Kong Convention
        and Exhibition Centre.<br />
        2.Payment should be processed with USDT on Polygon. If you do not have such currencies on
        Polygon, please kindly be reminded to get the currencies ready before you make the
        payment.<br />
        3.This NFT pass is non-refundable.<br />
        4.If you have purchase the NFT pass, please click: https://portus.world/web3-ticket for your
        e-ticket. Please print or take a screenshot of the QR code in advance and show it to the
        staff at the event entrance to check in.<br />
        5.If you have any questions about the event or the NFT Pass, please send an email to
        w3@blockchainlabs.org.<br />
      </p>
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

function downloadCanvasAsImage(canvas, filename) {
  let a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = filename;
  a.dispatchEvent(new MouseEvent('click'));
}

function handleDownload() {
  var canvas = document.getElementById('qrcode-canvas');
  downloadCanvasAsImage(canvas, 'qrcode.png');
}
</script>

<style lang="less" scoped>
.qrcode-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  > h3 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  > p {
    font-size: 12px;
    line-height: 1.5;
  }
  .qrcode-content-bg {
    background-color: #fff;
  }
  > .btn-download {
    margin-top: 16px;
    margin-bottom: 16px;
    height: 45px;
    width: 275px;
    line-height: 20px;
    border-radius: 20px;
    background: linear-gradient(90.06deg, rgba(125, 152, 221, 1) -1.7%, rgba(0, 108, 255, 1) 77.7%);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);

    color: #fff;
    font-size: 20px;
    text-align: center;
    font-family: Roboto;
    border: none;
    &:active {
      opacity: 0.85;
    }
  }
}
</style>
<style>
.el-dialog.tick-qrcode-dialog {
  background: transparent !important;
  .el-dialog__header {
    background-color: transparent;
  }
}
.tick-qrcode-mask {
  background: #000;
}
</style>
