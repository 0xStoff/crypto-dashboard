import { TokenData, AddressBalances, AllBalances, AddressString } from '../interfaces/interfaces';

export class Utils {
  static toLocaleString(value: number): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static isEthereum(token: TokenData): AddressString | undefined {
    return token.token === '0x0' ? undefined : token.token;
  }
}

const findTokenIndex = (accumulator: Array<TokenData>, token: TokenData): number =>
  accumulator.findIndex((item) => item.token === token.token);

const customReduceFunction = (
  tokens: Array<TokenData | Required<TokenData>>,
  processExistingToken: (existingToken: TokenData | Required<TokenData>, currentToken: TokenData | Required<TokenData>) => void,
  processNewToken: (currentToken: TokenData | Required<TokenData>) => TokenData | Required<TokenData>,
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
  const updatedBalance = parseFloat(existingToken.balance?.formatted || '0') + parseFloat(currentToken.balance?.formatted || '0');
  existingToken.balance = { formatted: updatedBalance.toString() };
};

const createNewToken = (currentToken: TokenData): TokenData => ({
  ...currentToken,
  balance: {
    ...currentToken.balance,
    formatted: currentToken.balance?.formatted || '0',
  },
});

const calculateTokenWorth = (token: TokenData): number => parseFloat(token.balance?.formatted || '0') * (token.price || 0);

export const uniqueTokenData = (tokens: Array<TokenData>): Array<TokenData> => customReduceFunction(
  tokens,
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
      currentValue: AddressBalances) => {
      return (accumulator + currentValue.tokens.reduce(
        (sum: number, token: TokenData) => sum + calculateTokenWorth(token), 0
      ));
    }, 0));

export const unifyTokenBalances = (tokenBalances: AllBalances): AllBalances =>
  tokenBalances.map(({ tokens, ...otherProps }) => ({
    tokens: unifyTokens(tokens),
    ...otherProps
  }));
