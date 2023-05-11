import Image from 'next/image';
import React from 'react';

import { chains } from '../data';
import { Chain, TokenData } from '../interfaces/interfaces';
import { Utils } from '../utils/utils';

interface TokenProps {
    tokenBalanceData: TokenData;
}

export const Token: React.FC<TokenProps> = ({ tokenBalanceData }) => {
  if (!tokenBalanceData || !tokenBalanceData.balance) {
    return null;
  }

  const {
    token, chain:{ chainId }, icon, name, symbol, price, balance: { formatted },
  } = tokenBalanceData;

  const currentPrice = price || 0;
  const balanceFormatted = parseFloat(formatted);
  const balanceUsdValue = currentPrice * balanceFormatted;
  const findChainIdIcon = chains
    .find((chain: Chain) => chainId === chain.chainId)?.icon;

  if (balanceFormatted < 0.1 && balanceUsdValue < 0.1) {
    return null;
  }

  return <div key={token}>
    <div className="card">
      <div>
        {findChainIdIcon && chainId !== 1 && (<Image
          className="network"
          alt="token icon"
          src={findChainIdIcon}
        />)}
        <Image alt="token icon"
          className="token"
          src={icon}/>
      </div>

      <div>
        <h2>{name}</h2>
        <p>
          {balanceFormatted.toFixed(5)} {symbol}
        </p>
        <p>${Utils.toLocaleString(balanceUsdValue)}</p>
      </div>
    </div>
  </div>;
};
