import { FetchBalanceResult } from '@wagmi/core';
import { StaticImageData } from 'next/image';

// Address
export type AddressString = `0x${string}`

export interface Address {
  address: AddressString;
  tag: string;
}

// Chain
export interface Chain {
    chain: string;
    chainId: number;
    icon: StaticImageData;
}

// Token
export interface TokenBase {
    name: string;
    symbol: string;
    token: AddressString;
    decimals: number;
    icon: StaticImageData;
}

// fetched Data
export interface Data {
    price: number;
    balance: Pick<FetchBalanceResult, 'formatted'>;
}

// Token + Chain + fetched Data
export interface TokenData extends Data, TokenBase {
    chain: Chain;
}

// Token Data Array + address
export interface AddressBalance extends Address{
    tokens: Array<TokenData>;
}

export type AllBalances = Array<AddressBalance>

//
// // Example with Record type
// export type NewCorrectRecord = Record<'tokens',
//     Array<TokenData>> & Address;
