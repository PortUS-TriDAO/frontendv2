<template>
  <el-dialog v-model="dailogVisible" title="Share" center>
    <div class="content">Share to twitter</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="handleShare"> Share </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import useClipboard from 'vue-clipboard3';

const props = defineProps(['visible', 'shareUrl']);
const emit = defineEmits(['close']);

const { toClipboard } = useClipboard();

const dailogVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    if (!value) {
      close();
    }
  },
});

function close() {
  emit('close');
}

async function handleShare() {
  try {
    await toClipboard(props.shareUrl);
    ElMessage.success('copy share url success');
    close();
  } catch (e) {
    console.log('share filed:', e);
    ElMessage.error('share filed');
  }
}
</script>

<style lang="less" scoped>
.content {
  text-align: center;
  font-size: 28px;
}
</style>
