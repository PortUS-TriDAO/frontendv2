import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  devServer: {
    // proxy: 'http://8.217.91.191:8000/v2',  // testnet
    proxy: 'http://8.217.214.25:8000/v2', // product
    // proxy: 'http://localhost:5173'
  },
});
