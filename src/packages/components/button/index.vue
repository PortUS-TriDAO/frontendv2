<template>
  <el-button
    class="p-button"
    :class="[styledClass, customClass]"
    v-bind="props"
    :type="props.type || 'primary'"
    @click.stop="handleClick"
  >
    <slot />
  </el-button>
</template>

<script lang="ts" setup>
import { buttonProps } from 'element-plus';
import { computed } from 'vue';

const props = defineProps({
  class: [String, Object],
  ...buttonProps,
});
defineOptions({
  name: 'PButton',
});
const customClass = computed(() => props.class);
const styledClass = computed(() => {
  return {
    'is-disabled': props.disabled,
  };
});
const emit = defineEmits(['click']);

function handleClick() {
  emit('click');
}
</script>

<style lang="less" scoped>
button {
  padding: 12px 30px;
  // outline: none;
  cursor: pointer;
  border-radius: 67px;
  min-width: 180px;
  // height: 50px;
  &.el-button--primary {
    background: linear-gradient(90deg, rgba(251, 114, 47, 1) 0%, rgba(246, 37, 12, 1) 100%);
    color: #fff;
    backdrop-filter: blur(10px);
    border: none;
    &.is-round {
      color: #f6250c;
      background: #fff;
      border: 1px solid #f6250c;
    }
    &.el-button--small {
      min-width: auto;
      padding: 5px 15px;
    }
  }
}
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #fff;
}
</style>
