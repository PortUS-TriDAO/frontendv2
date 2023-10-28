<template>
  <p
    :class="[
      'text-ellipsis',
      {
        'text-ellipsis--expand': !ellipsis,
      },
    ]"
  >
    <!-- <el-text class="w-150px mb-2" :truncated="ellipsis"><slot /></el-text> -->
    <span><slot /></span>
    <a @click="ellipsis = !ellipsis">
      <span>{{ ellipsis ? 'See more' : 'See less' }}</span>
      <el-icon v-if="ellipsis"><ArrowDownBold /></el-icon>
      <el-icon v-else><ArrowUpBold /></el-icon>
    </a>
  </p>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const ellipsis = ref(true);
</script>

<style lang="less">
.text-ellipsis {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  > span {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: inherit;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 0px;
    color: inherit;
    text-align: left;
  }
  > a {
    flex-shrink: 0;
    color: #2a82e4;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    gap: 4px;
  }
  &.text-ellipsis--expand {
    display: block;
    > span {
      display: inline;
      white-space: wrap;
    }
  }
}
</style>
