<template>
  <p
    :class="[
      'text-ellipsis',
      {
        'text-ellipsis--expand': !ellipsis,
        'text-ellipsis--line-clamp': props.line > 1,
      },
    ]"
  >
    <span :style="props.line > 1 && ellipsis ? `-webkit-line-clamp:${props.line}` : ''">
      <slot></slot>
    </span>
    <a v-if="!hideAction" @click="ellipsis = !ellipsis">
      <span>{{ ellipsis ? 'See more' : 'See less' }}</span>
      <el-icon v-if="ellipsis"><ArrowDownBold /></el-icon>
      <el-icon v-else><ArrowUpBold /></el-icon>
    </a>
  </p>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
defineOptions({
  name: 'textEllipsis',
});
const props = defineProps<{
  line?: number;
  hideAction?: boolean;
}>();
const ellipsis = ref(true);
</script>

<style lang="less">
.text-ellipsis {
  // display: flex;
  // flex-direction: row;
  margin-bottom: 12px;
  > span {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: inherit;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0px;
    color: inherit;
    text-align: left;
  }
  > a {
    flex-shrink: 0;
    // color: #2a82e4;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    gap: 4px;
    padding-left: 8px;
    background-color: #aaa;
    padding: 2px 4px;
    border-radius: 4px;
  }
  &.text-ellipsis--expand {
    display: block;
    > span {
      display: inline;
      white-space: wrap;
    }
  }
  &.text-ellipsis--line-clamp {
    > span {
      display: -webkit-inline-box;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
  }
}
</style>
