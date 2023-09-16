import { defineConfig } from '@vue/cli-service'

export default defineConfig({
  devServer: {
    // proxy: 'http://8.217.91.191:8000'
    proxy: 'http://localhost:5173'
  }
})
