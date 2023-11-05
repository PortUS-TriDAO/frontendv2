<template>
  <el-input :oninput="oninput" v-bind="props"></el-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'NumberInput',
});

const props = defineProps({
  valueType: {
    type: String,
    default: 'float',
  },
});

const oninput = computed(() =>
  props.valueType === 'uint'
    ? "value=value.replace(/[^0-9]/g, '')"
    : "value=value.replace(/[^0-9.]/g, '')",
);
</script>

<style lang="less" scoped></style>
