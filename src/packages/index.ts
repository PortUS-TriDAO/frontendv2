import Button from './components/button';
import NumberInput from './components/number-input';
import PageContainer from './components/page-container/index.vue';
import TextEllipsis from './components/text-ellipsis/index.vue';
import WalletButton from './components/wallet-button';

export function initPackages(app: any) {
  app
    .component('p-button', Button)
    .component('p-wallet-button', WalletButton)
    .component('p-number-input', NumberInput)
    .component('text-ellipsis', TextEllipsis)
    .component('page-container', PageContainer);
}
