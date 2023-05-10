import { fetchBalance } from '@wagmi/core';

import { Address, AddressString, TokenData, AllBalances } from '../interfaces/interfaces';

export const fetchTokenBalances = async (
  address: AddressString,
  tokens: Array<TokenData>
): Promise<Array<TokenData>> => {
  return Promise.all(tokens.map(async (token) => {
    const isEthereum = token.token === '0x0' ? undefined : token.token;
    const balance = await fetchBalance({
      address, token: isEthereum, chainId: token.chain.chainId,
    });
    return { ...token, balance };
  }));
};

export const getTokenBalances = async (
  addressList: Array<Address>,
  tokens: Array<TokenData>
): Promise<AllBalances> => {
  return Promise.all(
    addressList.map(async ({ address, tag }) => {
      const tokenBalances = await fetchTokenBalances(address, tokens);
      const updatedTokenData = tokenBalances.map((token) => ({ ...token }));
      return { address, tag, tokens: updatedTokenData };
    }));
};
