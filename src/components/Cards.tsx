import React from 'react';

import { Address, AllBalances } from '../interfaces/interfaces';

import { Tag } from './AddressItem';
import { Token } from './Token';

interface AddressListProps {
    addressList: Array<Address>;
    setAddressList: (value: Array<Address>) => void;
}

 interface CardsProps extends AddressListProps {
    balances: AllBalances;
}

export const NetWorth: React.FC<{ netWorth: string }> = ({ netWorth }) => (
  <div className="card-outline">
    <div>
      <h1>Net Worth</h1>
      <p className="worth">${netWorth}</p>
    </div>
  </div>
);

export const Cards = (
  { balances, addressList, setAddressList }: CardsProps,
) => <>
  {balances.map(({ address, tokens }) => {
    const addressData = addressList.find((item) => item.address === address);
    const tag = addressData ? addressData.tag : '';
    return (
      <div key={address}>
        <div className="token-list-grid">
          <div className="card-badge">
            <Tag
              tag={tag}
              setAddressList={setAddressList}
              addressList={addressList}
              address={address}
            />
          </div>
          {tokens.map((token) => (
            <Token
              key={`${token.token} ${token.chain.chainId}`}
              tokenBalanceData={token}
            />
          ))}
        </div>
      </div>
    );
  })}
</>;
