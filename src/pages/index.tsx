import React, { useState } from 'react';

import { PriceAndAddressList } from '../components/AddressItem';
import {  Cards, NetWorth } from '../components/Cards';
import { Buttons, Form } from '../components/Form';
import { BUNDLE, tokensMock } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAllTokenBalances } from '../hooks/useTokenBalances';
import { Address, AddressString, TokenData } from '../interfaces/interfaces';

function Page(): React.JSX.Element {
  const [tokens] = useState<Array<TokenData>>([...tokensMock]);
  const [addressList, setAddressList] = useLocalStorage<Array<Address>>('address-list', BUNDLE);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressString>('0x0');
  const [tag, setTag] = useState<string>('');
  const [unify, setUnify] = useState<boolean>(true);

  const { allTokenBalances, unifiedTokenBalances, netWorth } = useAllTokenBalances(addressList, tokens);

  return (
    <div className="container">
      <Buttons formVisible={formVisible}
        setFormVisible={setFormVisible}
        listVisible={listVisible}
        setListVisible={setListVisible}
      />
      <Form formVisible={formVisible}
        setAddress={setAddress}
        setTag={setTag}
        setAddressList={setAddressList}
        address={address}
        tag={tag}
        addressList={addressList}
      />
      <PriceAndAddressList
        listVisible={listVisible}
        addressList={addressList}
        setAddressList={setAddressList}
      />
      <NetWorth netWorth={netWorth}/>
      <button onClick={() => setUnify(!unify)}
        className="unify-button">
        {unify ? '⧜' : '⧝'}
      </button>
      <Cards
        balances={unify ? allTokenBalances : unifiedTokenBalances}
        addressList={addressList}
        setAddressList={setAddressList}
      />
    </div>);
}

export default Page;
