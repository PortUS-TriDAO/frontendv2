<template>
  <el-dialog v-model="props.visible" width="50%">
    <div class="dialog-share">
      <p>Share link copy to Clipboard successful</p>
      <ul class="share-icons">
        <li>
          <a :href="shareLinks.twitter" target="_blank" class="icon-twitter"></a>
        </li>
        <!-- <li>
          <a class="icon-facebook"></a>
        </li>
        <li>
          <a class="icon-instagram"></a>
        </li> -->
      </ul>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  visible: Boolean,
  text: String,
  cancel: Function,
  confirm: Function
})

// const shareLinkTemplete = {
//   facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}'
//   twitter: `https://twitter.com/intent/tweet?text=${props.text}&url=${URL}&via=${URL}`
// }

const URL = encodeURIComponent(window.location.origin)

const shareLinks = {
  twitter: 'https://twitter.com/intent/tweet?text='
}
watch(props, (newProps) => {
  shareLinks.twitter = `https://twitter.com/intent/tweet?text=${newProps.text}`
})
</script>
<style lang="less" scoped>
.dialog-share {
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    font-size: 20px;
    line-height: 150%;
    background: linear-gradient(90deg, #f6250c 4%, #fb722f 95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-transform: capitalize;
    letter-spacing: 0px;
    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
      margin-right: 16px;
      background: url('@/assets/images/icon-share-success.png') center center no-repeat;
      background-size: contain;
    }
  }
  .share-icons {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
    > li {
      padding: 23px;
      background-color: rgba(237, 150, 112, 0.12);
      width: 97px;
      height: 97px;
      box-sizing: border-box;
      border-radius: 6px;
      margin: 43px;
      cursor: pointer;
      > a {
        display: inline-block;
        width: 52px;
        height: 52px;
        &.icon-twitter {
          background: url('@/assets/images/icon-twitter.png') center center no-repeat;
          background-size: contain;
        }
        &.icon-facebook {
          background: url('@/assets/images/icon-facebook.png') center center no-repeat;
          background-size: contain;
        }
        &.icon-instagram {
          background: url('@/assets/images/icon-instagram.png') center center no-repeat;
          background-size: contain;
        }
      }
    }
  }
  // .share-icons {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-around;
  //   > div {
  //     padding: 23px;
  //     background-color: #ed9670;
  //     width: 97px;
  //     height: 97px;
  //     box-sizing: border-box;
  //     border-radius: 6px;
  //     > i {
  //       display: inline-block;
  //       width: 52px;
  //       height: 52px;
  //       &.icon-twitter {
  //         background: url('@/assets/images/icon-twitter.png') center center no-repeat;
  //         background-size: contain;
  //       }
  //     }
  //   }
  // }
}
</style>
