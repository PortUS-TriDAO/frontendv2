<template>
  <div class="short-address">
    <span>{{ shortAddress }}</span>
    <el-icon :size="14" @click="handleCopy">
      <CopyDocument />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { CopyDocument } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard();
defineOptions({
  name: 'ShortAddress',
});
const props = defineProps<{
  address: string;
}>();

const shortAddress = computed(() => `${props.address.slice(0, 4)}...${props.address.slice(-6)}`);

const handleCopy = async () => {
  await toClipboard(props.address);
  ElMessage.success('Copy address success');
};
</script>

<style lang="less" scoped>
.short-address {
  display: flex;
  flex-direction: row;
  align-items: center;
  > span {
    margin-right: 10px;
  }
  .el-icon {
    cursor: pointer;
  }
}
</style>
