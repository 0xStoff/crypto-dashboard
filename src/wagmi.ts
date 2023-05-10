import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism, zkSync } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const zkSyncRpcUrl = 'https://mainnet.era.zksync.io';

const {
  chains, provider, webSocketProvider
} = configureChains([mainnet, arbitrum, optimism, zkSync
], [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
  jsonRpcProvider({
    rpc: () => ({
      http: zkSyncRpcUrl,
    }),
  })],);

export const client = createClient({
  provider, webSocketProvider,
});

export { chains };
