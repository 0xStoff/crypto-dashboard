import aggregatorV3InterfaceABI from '@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json';
import { fetchBalance } from '@wagmi/core';
import { ethers } from 'ethers';

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

export const fetchPrice = async (rpcUrl: string, contractAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const aggregatorV3Interface = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

  const result = await aggregatorV3Interface.latestRoundData();
  const answer = result[1];
  const decimals = await aggregatorV3Interface.decimals();

  return parseFloat(ethers.utils.formatUnits(answer, decimals));
};

export const getTokenBalances = async (
  addressList: Array<Address>,
  tokens: Array<TokenData>
): Promise<AllBalances> => {
  return Promise.all(
    addressList.map(async ({ address, tag }) => {
      const tokenBalances = await fetchTokenBalances(address, tokens);
      const updatedTokenData = await Promise.all(tokenBalances.map(async (token) => {
        let price = 0;
        if (token.pools.length > 0) {
          price = await fetchPrice(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`, token.pools[0]);
        }
        return { ...token, price };
      }));
      return { address, tag, tokens: updatedTokenData };
    }));
};
