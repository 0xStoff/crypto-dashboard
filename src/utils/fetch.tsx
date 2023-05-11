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

  return {
    ...token,
    balance: { formatted: tokenBalance.formatted },
    price: 100
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
