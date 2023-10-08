import Button from './components/button';
import PageContainer from './components/page-container/index.vue';

export function initPackages(app: any) {
  app.component('p-button', Button);
  app.component('page-container', PageContainer);
}
