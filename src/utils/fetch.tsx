import { fetchBalance } from '@wagmi/core';

import { AddressInterface, AddressString, TokenInterface, Unify } from '../interfaces/interfaces';

export const fetchTokenBalances = async (address: AddressString, tokens: Array<TokenInterface>): Promise<Array<TokenInterface>> => {
  return Promise.all(tokens.map(async (token) => {
    const isEthereum = token.token === '0x0' ? undefined : token.token;
    const balance = await fetchBalance({
      address, token: isEthereum, chainId: token.chain.chainId,
    });
    return { ...token, balance };
  }));
};

export const getTokenBalances = async (
  addressList: Array<AddressInterface>,
  tokens: Array<TokenInterface>): Promise<Array<Unify>> => {
  return Promise.all(addressList.map(async ({ address, tag }) => {
    const tokenData = await fetchTokenBalances(address, tokens);
    const updatedTokenData = tokenData.map((token) => ({ ...token, price: 5 }));
    return { address, tag, tokenData: updatedTokenData };
  }));
};
