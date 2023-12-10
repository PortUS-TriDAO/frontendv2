<template>
  <div class="social-bar">
    <a
      v-if="website"
      class="icon-social-1"
      ref="noopener noreferrer"
      target="_blank"
      :href="website"
    ></a>
    <a
      v-if="twitter"
      class="icon-social-2"
      ref="noopener noreferrer"
      target="_blank"
      :href="twitter"
    ></a>
    <a
      v-if="discord"
      class="icon-social-3"
      ref="noopener noreferrer"
      target="_blank"
      :href="discord"
    ></a>
    <a
      v-if="instagram"
      class="icon-social-4"
      ref="noopener noreferrer"
      target="_blank"
      :href="instagram"
    ></a>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SocialBar',
});
defineProps<{
  website: string;
  twitter: string;
  discord: string;
  instagram: string;
}>();
</script>

<style lang="less" scoped>
.social-bar {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  > a {
    display: block;
    width: 32px;
    height: 32px;
  }

  .icon-social-1 {
    background: url('@/assets/images/social/icon-1.png') center center;
    background-size: 100%;
  }
  .icon-social-2 {
    background: url('@/assets/images/social/icon-2.png') center center;
    background-size: 100%;
  }
  .icon-social-3 {
    background: url('@/assets/images/social/icon-3.png') center center;
    background-size: 100%;
  }
  .icon-social-4 {
    background: url('@/assets/images/social/icon-4.jpg') center center;
    background-size: 100%;
  }
}
</style>
