import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import '../App.css';
import '../index.css';

import { client } from '../wagmi';

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>dashboard</title>
      </NextHead>
      {mounted && React.createElement(Component, pageProps)}
    </WagmiConfig>
  );
}

export default App;
