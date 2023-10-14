// import './assets/main.css'

import 'element-plus/dist/index.css';
import 'normalize.css';
import './index.css';
import './assets/global.less';
import './utils/wallet';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { worker } from './mock';
import { initPackages } from './packages';
import router from './router';

const app = createApp(App);
initPackages(app);

if (import.meta.env.MODE === 'development') {
  worker.start();
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
