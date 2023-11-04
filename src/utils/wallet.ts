import { polygonMumbai } from '@wagmi/core/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue';

const projectId = 'fa9681b4696d945b7a1446be41240f2c';
const chains = [polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId });
export const web3modal = createWeb3Modal({ wagmiConfig, projectId, chains });
