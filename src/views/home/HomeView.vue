<template lang="">
  <div>
    <H1>Home Page</H1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { statistic } from '@/api'

const route = useRoute()

onMounted(async () => {
  const refer = route.query.refer
  if (!refer) return
  const { success, data } = await statistic({
    referCode: refer
  })

  if (success) {
    const redirectURL =
      data.redirectUrl.slice(0, 4) === 'http'
        ? `${data.redirectUrl}?refer=${refer}`
        : `http://${data.redirectUrl}?refer=${refer}`
    console.log('redirectURL', redirectURL)
    window.location.href = redirectURL
  }
})
</script>
<style lang="less"></style>
