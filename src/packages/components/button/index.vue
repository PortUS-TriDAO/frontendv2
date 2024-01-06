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
  padding: 16px 30px;
  // outline: none;
  cursor: pointer;
  // border-radius: 67px;
  min-width: 180px;
  // height: 46px;
  &.el-button--primary {
    font-size: 24px;
    height: 40px;
    border-radius: 50px;
    background: linear-gradient(90.06deg, rgba(125, 152, 221, 1) -1.7%, rgba(0, 108, 255, 1) 77.7%);
    color: #fff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);

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
    &:hover {
      opacity: 0.85;
    }
  }
}
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #fff;
}
</style>
