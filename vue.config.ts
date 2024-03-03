import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  devServer: {
    proxy: 'http://8.217.214.25:8000/v2',
    // proxy: 'http://localhost:5173'
  },
});
