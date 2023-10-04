<template>
  <el-button type="primary" class="p-button" :class="[styledClass, customClass]" v-bind="props">
    <slot />
  </el-button>
</template>

<script lang="ts" setup>
import { buttonProps } from 'element-plus';
import { computed, defineProps } from 'vue';
const props = defineProps({
  class: [String, Object],
  ...buttonProps,
});
const customClass = computed(() => props.class);
const styledClass = computed(() => {
  return {
    'is-disabled': props.disabled,
  };
});
</script>

<style lang="less" scoped>
button {
  padding: 11px 63px;
  color: #fff;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgba(251, 114, 47, 1) 0%, rgba(246, 37, 12, 1) 100%);
  backdrop-filter: blur(10px);
  cursor: pointer;
  border-radius: 67px;
}
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #fff;
}
</style>
