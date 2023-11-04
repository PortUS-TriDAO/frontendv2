<template>
  <main class="page-container">
    <div class="page-banner" v-if="props.bannerImg || showBanner">
      <img :src="props.bannerImg" />
    </div>
    <!-- <div class="page-banner" v-else-if="$slots.banner"><slot name="banner" /></div> -->
    <article>
      <slot />
    </article>
  </main>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  bannerImg: String,
  showBanner: Boolean,
});
</script>

<style lang="less">
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  // justify-content: center;
  // width: 100%;
  flex: 1;
  > article {
    background: #ffffff;
    flex-grow: 1;
    width: var(--container-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    padding-bottom: 30px;
    padding-top: 20px;
  }
  .page-banner {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: rgb(4, 1, 14);
    display: flex;
    justify-content: center;
    > img {
      width: 1200px;
      // max-height: 100%;
    }
  }
}
</style>
