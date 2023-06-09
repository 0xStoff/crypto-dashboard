import aggregatorV3InterfaceABI from '@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json';
import { fetchBalance } from '@wagmi/core';
import { ethers } from 'ethers';

import { Address, AllBalances, TokenData } from '../interfaces/interfaces';

import { Utils } from './utils';

export const fetchPrice = async (rpcUrl: string, contractAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const aggregatorV3Interface = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

  const result = await aggregatorV3Interface.latestRoundData();
  const answer = result[1];
  const decimals = await aggregatorV3Interface.decimals();

  return parseFloat(ethers.utils.formatUnits(answer, decimals));
};

const fetchTokenBalanceForAddress = async (
  address: Address,
  token: TokenData,
): Promise<TokenData> => {

  const tokenBalance = await fetchBalance({
    address: address.address,
    token: Utils.isEthereum(token),
    chainId: token.chain.chainId,
  });

  let price = 0;
  if (token.pools.length > 0) {
    price = await fetchPrice(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`, token.pools[0].pool);
    if (token.pools[0].base === 'eth') {
      const ethPrice = await fetchPrice(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,'0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419');
      price = price * ethPrice;
    }
  }

  return {
    ...token,
    balance: { formatted: tokenBalance.formatted },
    price
  };
};

const fetchTokenBalancesForAddress = async (
  address: Address,
  tokens: Array<TokenData>,
): Promise<Array<TokenData>> => Promise.all(tokens.map(async (token) => fetchTokenBalanceForAddress(address, token)));

export const fetchTokenBalancesForAddresses = async (
  addressList: Array<Address>,
  tokens: Array<TokenData>,
): Promise<AllBalances> => Promise.all(
  addressList.map(async (address) => {
    const tokenBalances = await fetchTokenBalancesForAddress(address, tokens);
    return { ...address, tokens: tokenBalances };
  }),
);
