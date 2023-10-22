import Button from './components/button';
import NumberInput from './components/number-input';
import WalletButton from './components/wallet-button';

export function initPackages(app: any) {
  app
    .component('p-button', Button)
    .component('p-wallet-button', WalletButton)
    .component('p-number-input', NumberInput);
}
