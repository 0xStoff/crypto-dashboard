import { tokensMock } from '../data';
import { TokenData, AddressBalance, AllBalances } from '../interfaces/interfaces';

class Utils {
  static toLocaleString(value: number): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

const findTokenIndex = (accumulator: Array<TokenData>, token: TokenData): number =>
  accumulator.findIndex((item) => item.token === token.token);

const customReduceFunction = (
  tokens: Array<TokenData>,
  processExistingToken: (existingToken: TokenData, currentToken: TokenData) => void,
  processNewToken: (currentToken: TokenData) => TokenData,
): Array<TokenData> => {
  return tokens.reduce((accumulatedTokens: Array<TokenData>, currentToken: TokenData) => {
    const existingTokenIndex = findTokenIndex(accumulatedTokens, currentToken);

    if (existingTokenIndex !== -1) {
      processExistingToken(accumulatedTokens[existingTokenIndex], currentToken);
    } else {
      accumulatedTokens.push(processNewToken(currentToken));
    }

    return accumulatedTokens;
  }, []);
};

const updateExistingToken = (existingToken: TokenData, currentToken: TokenData): void => {
  const updatedBalance = parseFloat(existingToken.balance.formatted) + parseFloat(currentToken.balance.formatted);
  existingToken.balance.formatted = updatedBalance.toString();
};

const createNewToken = (currentToken: TokenData): TokenData => ({
  ...currentToken,
  balance: {
    ...currentToken.balance,
    formatted: currentToken.balance.formatted,
  },
});

const calculateTokenWorth = (token: TokenData): number => parseFloat(token.balance.formatted) * token.price;

export const uniqueTokenData: Array<TokenData> =
    customReduceFunction(
      tokensMock,
      () => null,
      (currentToken) => currentToken,
    );

export const unifyTokens = (tokens: Array<TokenData>): Array<TokenData> =>
  customReduceFunction(
    tokens,
    updateExistingToken,
    createNewToken
  );

export const calculateNetWorth = (tokenBalances: AllBalances): string =>
  Utils.toLocaleString(
    tokenBalances.reduce((
      accumulator: number,
      currentValue: AddressBalance) => {
      return (accumulator + currentValue.tokens.reduce(
        (sum: number, token: TokenData) => sum + calculateTokenWorth(token), 0
      ));
    }, 0));

export const unifyTokenBalances = (tokenBalances: AllBalances): AllBalances =>
  tokenBalances.map(({ tokens, ...otherProps }) => ({
    tokens: unifyTokens(tokens),
    ...otherProps
  }));
