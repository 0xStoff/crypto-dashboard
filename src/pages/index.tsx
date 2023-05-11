import React, { useEffect, useState } from 'react';

import { PriceAndAddressList } from '../components/AddressItem';
import { Cards, NetWorth } from '../components/Cards';
import { Buttons, Form } from '../components/Form';
import { BUNDLE, tokensMock } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAllTokenBalances } from '../hooks/useTokenBalances';
import { Address, AddressString, AllBalances, TokenData } from '../interfaces/interfaces';
import { calculateNetWorth, unifyTokenBalances } from '../utils/utils';

function Page(): React.JSX.Element {
  const [tokens] = useState<Array<TokenData>>([...tokensMock.map((token) => ({ ...token, price: 100 }))]);
  const [addressList, setAddressList] = useLocalStorage<Array<Address>>('address-list', BUNDLE);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressString>('0x0');
  const [tag, setTag] = useState<string>('');
  const [unify, setUnify] = useState<boolean>(true);

  const { allTokenBalances, loading, refetchBalances } = useAllTokenBalances(addressList, tokens);
  const [balances, setBalances] = useState<AllBalances>([]);
  const [unifiedTokenBalances, setUnifiedTokenBalances] = useState<AllBalances>([]);
  const [netWorth, setNetWorth] = useState<string>('0');

  useEffect(() => {
    // setTokens([...tokensMock.map((token) => ({ ...token, price: 400 }))]);
    setBalances(allTokenBalances);
    setUnifiedTokenBalances(unifyTokenBalances(balances));
    setNetWorth(calculateNetWorth(balances));
  }, [allTokenBalances, balances]);

  return (
    <div className="container">
      <Buttons
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        listVisible={listVisible}
        setListVisible={setListVisible}
      />
      <Form
        formVisible={formVisible}
        setAddress={setAddress}
        setTag={setTag}
        setAddressList={setAddressList}
        address={address}
        tag={tag}
        addressList={addressList}
      />
      {loading && <h1>Loading...</h1>}

      <PriceAndAddressList
        listVisible={listVisible}
        addressList={addressList}
        setAddressList={setAddressList}
        tokens={tokens}
      />
      <NetWorth netWorth={netWorth}/>
      <div className='flex-container'>
        <button onClick={() => refetchBalances()}
          className="action-button refetch-button">
                    ↺
        </button>
        <button onClick={() => setUnify(!unify)}
          className="action-button">
          {unify ? '⧜' : '⧝'}
        </button>
      </div>
      <Cards
        balances={unify ? balances : unifiedTokenBalances}
        addressList={addressList}
        setAddressList={setAddressList}
      />
    </div>);
}

export default Page;

// const getPrice = async (token) => {
//   if (token.pools.length >0) {
//     const price = await fetchPrice(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`, token.pools[0]);
//     setPrice(price);
//   } else {
//     setPrice(1000);
//   }
// };
