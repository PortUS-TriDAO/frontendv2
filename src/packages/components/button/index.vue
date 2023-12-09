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
    font-size: 20px;
    line-height: 28px;
    height: 46px;
    // background: url('@/assets/images/btn-bg.png');
    // background: linear-gradient(90deg, rgba(251, 114, 47, 1) 0%, rgba(246, 37, 12, 1) 100%);
    background: linear-gradient(
      180deg,
      rgba(71, 160, 247, 1) 0%,
      rgba(49, 130, 247, 1) 56%,
      rgba(145, 201, 251, 0) 99%
    );
    border-radius: 40px 0px 40px 40px;
    color: #fff;
    // backdrop-filter: blur(10px);
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
