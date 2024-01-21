<template>
  <main class="page-container" :style="style">
    <div class="page-banner" v-if="bannerImg || showBanner">
      <img :src="bannerImg" />
    </div>
    <!-- <div class="page-banner" v-else-if="$slots.banner"><slot name="banner" /></div> -->
    <article>
      <div v-if="title" class="page-container-header-wrapper">
        <div class="page-container-header">
          <div>
            <button @click="handleBack">
              <!-- <img :src="iconBack" /> -->
              <el-icon><ArrowLeftBold /></el-icon>
            </button>
          </div>
          <h3>{{ title }}</h3>
          <div></div>
        </div>
      </div>
      <slot />
    </article>
  </main>
</template>
<script lang="ts" setup>
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'PageContainer',
});
const props = defineProps({
  bannerImg: String,
  showBanner: Boolean,
  title: String,
  backgroundImage: String,
});
const style = computed(() => {
  return props.backgroundImage
    ? {
        backgroundImage: `url(${props.backgroundImage})`,
      }
    : null;
});
function handleBack() {
  router.go(-1);
}
</script>

<style lang="less">
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(6, 23, 58, 1) url('./assets/bg-page.png') no-repeat center top;
  background-size: contain;
  flex: 1;
  > article {
    flex-grow: 1;
    width: var(--container-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    padding-bottom: 30px;
    padding-top: 20px;
    color: #fff;
    position: relative;
  }
  .page-banner {
    width: 100%;
    height: 220px;
    overflow: hidden;
    background-color: rgb(4, 1, 14);
    display: flex;
    justify-content: center;
    > img {
      width: 1200px;
      // max-height: 100%;
    }
  }
  .page-container-header-wrapper {
    height: 38px;
  }
  .page-container-header {
    position: absolute;
    left: 0;
    top: 0;
    max-width: var(--container-width);
    width: 100%;
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    color: #fff;

    button {
      width: 36px;
      height: 36px;
      border-style: none;
      background-color: transparent;
      padding: 0;
      color: inherit;
      cursor: pointer;
      > img {
        height: 36px;
        width: 36px;
      }
    }
    h3 {
      flex: auto;
      text-align: center;
    }
    > div {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
}
</style>
