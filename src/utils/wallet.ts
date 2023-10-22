// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/html'
// import { configureChains, createConfig } from '@wagmi/core'
// import { polygonMumbai } from '@wagmi/core/chains'

// const chains = [polygonMumbai]
// const projectId = 'fa9681b4696d945b7a1446be41240f2c'

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })

// export const ethereumClient = new EthereumClient(wagmiConfig, chains)
// export const web3modal = new Web3Modal({ projectId }, ethereumClient)

import { polygonMumbai } from '@wagmi/core/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue';

const projectId = 'fa9681b4696d945b7a1446be41240f2c';
const chains = [polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId });
export const web3modal = createWeb3Modal({ wagmiConfig, projectId, chains });
