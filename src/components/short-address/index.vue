<template>
  <div class="short-address">
    <span>{{ shortAddress }}</span>
    <CopyDocument />
  </div>
</template>

<script lang="ts" setup>
import { CopyDocument } from '@element-plus/icons-vue';
import { computed } from 'vue';
defineOptions({
  name: 'ShortAddress',
});
const props = defineProps<{
  address: string;
}>();

const shortAddress = computed(() => `${props.address.slice(0, 4)}...${props.address.slice(-6)}`);
</script>

<style lang="less" scoped>
.short-address {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
