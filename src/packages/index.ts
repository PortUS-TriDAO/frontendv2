import Button from './components/button';
import NoData from './components/no-data/index.vue';
import NumberInput from './components/number-input';
import PageContainer from './components/page-container/index.vue';
import ShortAddress from './components/short-address/index.vue';
import TextEllipsis from './components/text-ellipsis/index.vue';
import WalletButton from './components/wallet-button/index.vue';

export function initPackages(app: any) {
  app
    .component('p-button', Button)
    .component('p-wallet-button', WalletButton)
    .component('p-number-input', NumberInput)
    .component('text-ellipsis', TextEllipsis)
    .component('page-container', PageContainer)
    .component('short-address', ShortAddress)
    .component('no-data', NoData);
}
