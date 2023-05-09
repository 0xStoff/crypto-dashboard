import { tokenDataMock } from '../data';
import { TokenInterface, AddressTokenData, TokenBalanceDataInterface, Unify } from '../interfaces/interfaces';

export const uniqueTokenData: Array<TokenInterface> =
  tokenDataMock.reduce((accumulator: Array<TokenInterface>, current: TokenInterface) => {
    const index = accumulator.findIndex((item) => item.token === current.token);
    if (index === -1) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

export const unifyTokens = (tokens: Array<TokenBalanceDataInterface>): Array<TokenBalanceDataInterface> => {
  return tokens.reduce((acc: Array<TokenBalanceDataInterface>, token: TokenBalanceDataInterface) => {
    const existingTokenIndex = acc.findIndex((t) => t.token === token.token);
    if (existingTokenIndex !== -1) {
      acc[existingTokenIndex].balance.formatted = (acc[existingTokenIndex].balance.formatted) + parseFloat(token.balance.formatted);
    } else {
      acc.push({
        ...token, balance: {
          ...token.balance,
          formatted: token.balance.formatted,
        },
      });
    }
    return acc;
  }, []);
};

export const calculateNetWorth = (tokenBalances: Array<AddressTokenData>): string =>
  tokenBalances.reduce((
    accumulator: number,
    currentValue: AddressTokenData) => {
    return accumulator + currentValue.tokenData.reduce((sum: number, token: TokenBalanceDataInterface) => sum + (parseFloat(token.balance.formatted) * token.price), 0);
  }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const unifyTokenBalances = (tokenBalances: Array<AddressTokenData | Unify>):Array<AddressTokenData> =>
  tokenBalances.map(({
    address,
    tokenData
  }) => ({
    address,
    tokenData: unifyTokens(tokenData)
  }));
