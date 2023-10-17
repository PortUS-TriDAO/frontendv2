import Button from './components/button';
import WalletButton from "./components/w-button"
export function initPackages(app: any) {
  app.component('p-button', Button)
    .component('w-button', WalletButton)
}
