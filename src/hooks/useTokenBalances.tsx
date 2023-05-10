import { useEffect, useState } from 'react';

import { Address, TokenData, AllBalances } from '../interfaces/interfaces';
import { getTokenBalances } from '../utils/fetch';
import { calculateNetWorth, unifyTokenBalances } from '../utils/utils';

interface AllTokenBalancesResult {
    allTokenBalances: AllBalances;
    unifiedTokenBalances: AllBalances;
    netWorth: string;
}

export const useAllTokenBalances = (addressList: Array<Address>, tokens: Array<TokenData>): AllTokenBalancesResult => {
  const [allTokenBalances, setAllTokenBalances] = useState<AllBalances>([]);
  const [unifiedTokenBalances, setUnifiedTokenBalances] = useState<AllBalances>([]);
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
