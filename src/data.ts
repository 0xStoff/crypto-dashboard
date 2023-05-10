import arb from './assets/arb.png';
import eth from './assets/eth.png';
import grail from './assets/grail.svg';
import link from './assets/link.png';
import magic from './assets/magic.png';
import ocean from './assets/ocean.png';
import op from './assets/optimism.svg';
import rlc from './assets/rlc.svg';
import zk from './assets/zk.svg';
import { Address, Chain, TokenBase, TokenData } from './interfaces/interfaces';

const ethereum: Chain = {
  chain: 'mainnet',
  chainId: 1,
  icon: eth
};

const arbitrum: Chain = {
  chain: 'arbitrum',
  chainId: 42161,
  icon: arb
};

const optmisim: Chain = {
  chain: 'optimism',
  chainId: 10,
  icon: op
};

const zkSync: Chain = {
  chain: 'zksync',
  chainId: 324,
  icon: zk
};

export const chains: Array<Chain> = [ethereum, arbitrum, optmisim, zkSync];

const etherToken: TokenBase = {
  name: 'Ethereum',
  symbol: 'ETH',
  token: '0x0',
  icon: eth,
  decimals: 18,
};

const magicToken: TokenBase = {
  decimals: 18,
  icon: magic,
  name: 'Magic',
  symbol: 'MAGIC',
  token: '0x539bde0d7dbd336b79148aa742883198bbf60342',
};

const arbitrumToken: TokenBase = {
  decimals: 18,
  icon: arb,
  name: 'Arbitrum',
  symbol: 'ARB',
  token: '0x912ce59144191c1204e64559fe8253a0e49e6548',
};

const grailToken: TokenBase = {
  decimals: 18,
  icon: grail,
  name: 'Grail',
  symbol: 'GRAIL',
  token: '0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8',
};

const opToken: TokenBase = {
  decimals: 18,
  icon: op,
  name: 'Optimism',
  symbol: 'OP',
  token: '0x4200000000000000000000000000000000000042'
};

const linkToken: TokenBase = {
  decimals: 18,
  icon: link,
  name: 'Chainlink',
  symbol: 'LINK',
  token: '0x514910771AF9Ca656af840dff83E8264EcF986CA'
};

const oceanToken: TokenBase = {
  decimals: 18,
  icon: ocean,
  name: 'Ocean Protocol',
  symbol: 'OCEAN',
  token: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'
};

const rlcToken: TokenBase = {
  decimals: 18,
  icon: rlc,
  name: 'iExec',
  symbol: 'RLC',
  token: '0x607F4C5BB672230e8672085532f7e901544a7375'
};

export const tokensMock: Array<TokenData> = [
  {
    chain: ethereum,
    ...etherToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: zkSync,
    ...etherToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: arbitrum,
    ...etherToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: optmisim,
    ...etherToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: arbitrum,
    ...magicToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: arbitrum,
    ...arbitrumToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: arbitrum,
    ...grailToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: optmisim,
    ...opToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: ethereum,
    ...linkToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: ethereum,
    ...oceanToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  },
  {
    chain: ethereum,
    ...rlcToken,
    price: 0,
    balance: {
      formatted: '0'
    }
  }];

export const BUNDLE: Array<Address> = [{
  address: '0x770353615119F0f701118d3A4eaf1FE57fA00F84',
  tag: 'stoff.eth',
},
{
  address: '0x6e04F6242703B9B29811Fc5e2e5c2556dB4c0c82',
  tag: 'L 3.0',
},
{
  address: '0x9c4dA1823855d1a69DC73DA74082336F8fDbdC96',
  tag: 'MM',
},
{
  address: '0xC9D4D50F8c9e51Ca4416AAb42E612A886f0d52e8',
  tag: 'L 1.1',
},
{
  address: '0x1A69Fe2164B72803B2FD3D0c29628F56831a9524',
  tag: 'L 2.0',
},
{
  address: '0xA8d58cd36835970aF11BE0fF1f9e2d66C79417cB',
  tag: 'L 1.25',
},
{
  address: '0x5fc7557cf5442aBda015B388BE8bd379eED79f1E',
  tag: 'L 2.25',
},
{
  address: '0xA25f8AC24164198AaCB910DFF36CC41D28f730cD',
  tag: 'Ape',
},
{
  address: '0xeC35D2720cE5b694d22dB85C6Dd9ed5C26d35483',
  tag: 'L 3.25',
}];
