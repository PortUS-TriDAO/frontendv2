<template>
  <main class="page-container">
    <div class="page-banner" v-if="$slots.banner"><slot name="banner" /></div>
    <article>
      <slot />
    </article>
  </main>
</template>
<style lang="less">
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  flex: 1;
  > article {
    background: #ffffff;
    flex-grow: 1;
    width: var(--container-width);
    padding-left: var(--container-padding-left);
    padding-right: var(--container-padding-right);
    padding-bottom: 30px;
  }
}
</style>
