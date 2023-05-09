import Image from 'next/image';
import React from 'react';

import { chains } from '../data';
import { ChainInterface, TokenBalanceDataInterface } from '../interfaces/interfaces';

interface TokenProps {
    tokenBalanceData: TokenBalanceDataInterface;
}

export const Token: React.FC<TokenProps> = ({ tokenBalanceData }) => {
  if (!tokenBalanceData || !tokenBalanceData.balance) {
    return null;
  }

  const {
    token, chainId, icon, name, symbol, price, balance: { formatted },
  } = tokenBalanceData;

  const currentPrice = price || 0;
  const balanceFormatted = parseFloat(formatted);
  const balanceUsdValue = currentPrice * balanceFormatted;
  const findChainIdIcon = chains
    .find((chain: ChainInterface) => chainId === chain.chainId)?.icon;

  if (balanceUsdValue < 0.1) {
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
        <p>${balanceUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    </div>
  </div>;
};
