import React, { useState } from 'react';

import {
  renderAddressList,
  renderButtons,
  renderCards, renderForm,
  renderNetWorth,
  renderPriceList
} from '../components/Home';
import { BUNDLE, tokenDataMock } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAllTokenBalances } from '../hooks/useTokenBalances';
import { AddressInterface, AddressString, TokenInterface } from '../interfaces/interfaces';

function Page(): React.JSX.Element {
  const [tokens] = useState<Array<TokenInterface>>([...tokenDataMock]);
  const [addressList, setAddressList] = useLocalStorage<Array<AddressInterface>>('address-list', BUNDLE);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressString>('0x0');
  const [tag, setTag] = useState<string>('');
  const [unify, setUnify] = useState<boolean>(true);

  const { allTokenBalances, unifiedTokenBalances, netWorth } = useAllTokenBalances(addressList, tokens);

  return (
    <div className="container">
      {renderButtons({ formVisible, setFormVisible, listVisible, setListVisible })}
      {renderForm({ formVisible, setAddress, setTag, setAddressList, address, tag, addressList })}
      <div className={`container-list ${listVisible ? 'visible' : ''}`}>
        {renderPriceList()}
        {renderAddressList({ addressList, setAddressList })}
      </div>
      {renderNetWorth(netWorth)}
      <button onClick={() => setUnify(!unify)}
        className="unify-button">
        {unify ? '⧜' : '⧝'}
      </button>
      {unify && renderCards({ balances: allTokenBalances,addressList, setAddressList })}
      {!unify && renderCards({ balances: unifiedTokenBalances, addressList, setAddressList })}
    </div>);
}

export default Page;
