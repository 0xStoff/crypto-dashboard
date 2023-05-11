import { useEffect, useReducer } from 'react';

import { Address, AllBalances, TokenData, } from '../interfaces/interfaces';
import { fetchTokenBalancesForAddresses } from '../utils/fetch';

interface State {
    allTokenBalances: AllBalances;
    loading: boolean;
    refetchCounter: number;
}

type Action =
    | { type: 'FETCH_SUCCESS'; payload: AllBalances }
    | { type: 'REFETCH' };

interface AllTokenBalancesResult {
    allTokenBalances: AllBalances;
    loading: boolean;
    refetchBalances: () => void;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, allTokenBalances: action.payload, loading: false };
    case 'REFETCH':
      return { ...state, refetchCounter: state.refetchCounter + 1, loading: true };
    default:
      return state;
  }
}

export const useAllTokenBalances = (
  addressList: Array<Address>,
  tokens: Array<TokenData>,
): AllTokenBalancesResult => {
  const [state, dispatch] = useReducer(reducer, {
    allTokenBalances: [],
    loading: true,
    refetchCounter: 0,
  });

  useEffect(() => {
    const fetchAllTokenBalances = async () => {
      const allBalances = await fetchTokenBalancesForAddresses(addressList, tokens);
      dispatch({ type: 'FETCH_SUCCESS', payload: allBalances });
    };

    fetchAllTokenBalances();
  }, [addressList, tokens, state.refetchCounter]);

  const refetchBalances = () => {
    dispatch({ type: 'REFETCH' });
  };

  return { allTokenBalances: state.allTokenBalances, loading: state.loading, refetchBalances };
};
