<template>
  <div class="page-business-list">
    <ul>
      <li>
        <business-list-item></business-list-item>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BusinessListItem from '@/views/mine/components/BusinessListItem.vue';
</script>

<style lang="less" scoped>
.page-business-list {
  > ul {
    list-style: none;
    margin: 0 30px;
    padding: 30px 0;
    border-radius: 8px;
  }
}
</style>
