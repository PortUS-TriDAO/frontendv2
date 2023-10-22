<template>
  <div class="success-card">
    <i class="icon-success"></i>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-success {
    display: block;
    width: 167px;
    height: 140px;
    background: url('@/assets/images/icon-success.png') center center no-repeat;
    background-size: contain;
  }
  p {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
  }
}
</style>
