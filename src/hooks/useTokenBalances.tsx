import { useEffect, useState } from 'react';

import { AddressInterface, AddressTokenData, TokenInterface, Unify } from '../interfaces/interfaces';
import { getTokenBalances } from '../utils/fetch';
import { calculateNetWorth, unifyTokenBalances } from '../utils/utils';

interface AllTokenBalancesResult {
  allTokenBalances: Array<AddressTokenData>;
  unifiedTokenBalances: Array<AddressTokenData>;
  netWorth: number;
}

export const useAllTokenBalances = (addressList: Array<AddressInterface>, tokens: Array<TokenInterface>): AllTokenBalancesResult => {
  const [allTokenBalances, setAllTokenBalances] = useState<Array<Unify>>([]);
  const [unifiedTokenBalances, setUnifiedTokenBalances] = useState<Array<AddressTokenData>>([]);
  const [netWorth, setNetWorth] = useState<string>('0');

  useEffect(() => {
    const fetchAllTokenBalances = async () => {
      const tokenBalances = await getTokenBalances(addressList, tokens);
      setUnifiedTokenBalances(unifyTokenBalances(tokenBalances));
      setAllTokenBalances(tokenBalances);
      setNetWorth(calculateNetWorth(tokenBalances));
    };

    fetchAllTokenBalances();
  }, [addressList, tokens]);

  return { allTokenBalances, unifiedTokenBalances, netWorth };
};
