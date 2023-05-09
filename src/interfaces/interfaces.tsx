import { FetchBalanceResult } from '@wagmi/core';
import { StaticImageData } from 'next/image';

export type AddressString = `0x${string}`

// Chain data
export interface ChainInterface {
  chain: string;
  chainId: number;
  icon: StaticImageData;
}

export interface TokenBaseInterface {
  name: string;
  symbol: string;
  token: AddressString;
  decimals: number;
  icon: StaticImageData;
}

// Token data
export interface TokenInterface extends TokenBaseInterface {
  chain: ChainInterface;
  price: number;
}

// FetchBalanceResult

// Address data
export interface AddressInterface {
  address: AddressString;
  tag: string;
}

export interface TokenBalanceDataInterface extends TokenInterface {
  chainId?: number;
  balance: {
    formatted: string;
  };
}

// Address token data (combines Address, Token and Balance data)
export interface AddressTokenData extends Omit<AddressInterface, 'tag'> {
  tokenData: Array<TokenBalanceDataInterface>;
}

export interface Unify {
  address: `0x${string}`;
  tag: string;
  tokenData: Array<{
    symbol: string;
    chain: ChainInterface;
    price: number;
    decimals: number;
    name: string;
    icon: StaticImageData;
    token: AddressString;
  }>;
}

export interface FetchInterface {
  price: number;
  balance: {
    formatted: string;
  };
}

export interface FetchInterfaceYas {
  price: number;
  balance: FetchBalanceResult;
}

// WAGMI; balance fetch
// FetchBalanceResult interface
// {
//   "decimals": 18,
//   "formatted": "0.019151475396703016",
//   "symbol": "ETH",
//   "value": {
//   "type": "BigNumber",
//     "hex": "0x440a2a57f1f328"
// }
// }

export interface NewCorrectInterface {
  address: AddressString;
  tag: string;

  tokens: Array<{
    name: string;
    symbol: string;
    contract: AddressString;
    decimals: number;
    icon: StaticImageData;
    chain: ChainInterface;
    data: FetchInterface;
  }>;
}

export interface NewCorrectInterfaceMock {
  address: `0x${string}`;
  tag: string;

  tokens: Array<{
    name: string;
    symbol: string;
    contract: `0x${string}`;
    decimals: number;
    icon: StaticImageData;

    chain: {
      name: string;
      chainId: number;
      icon: StaticImageData;
    };

    data: {
      price: number;
      balance: FetchBalanceResult; // WAGMI
    };
  }>;
}

export type AllData = Array<NewCorrectInterface>
