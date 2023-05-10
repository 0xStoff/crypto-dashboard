import aggregatorV3InterfaceABI from '@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json';
import { ethers } from 'ethers';
import React, { useState , useEffect } from 'react';

import { PriceAndAddressList } from '../components/AddressItem';
import {  Cards, NetWorth } from '../components/Cards';
import { Buttons, Form } from '../components/Form';
import { BUNDLE, tokensMock } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAllTokenBalances } from '../hooks/useTokenBalances';
import { Address, AddressString, TokenData } from '../interfaces/interfaces';

const usePriceFeed = (contractAddress, rpcUrl) => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const aggregatorV3Interface = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

      const result = await aggregatorV3Interface.latestRoundData();
      const answer = result[1];
      const decimals = await aggregatorV3Interface.decimals();
      const price = parseFloat(ethers.utils.formatUnits(answer, decimals));

      setPrice(price);
      setLoading(false);
    };

    fetchPrice();
  }, [contractAddress, rpcUrl]);

  return { price, loading };
};

function Page(): React.JSX.Element {
  const [tokens] = useState<Array<TokenData>>([...tokensMock]);
  const [addressList, setAddressList] = useLocalStorage<Array<Address>>('address-list', BUNDLE);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressString>('0x0');
  const [tag, setTag] = useState<string>('');
  const [unify, setUnify] = useState<boolean>(true);

  const { allTokenBalances, unifiedTokenBalances, netWorth } = useAllTokenBalances(addressList, tokens);

  const rpcUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
  const contractAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
  const { price, loading } = usePriceFeed(contractAddress, rpcUrl);

  useEffect(() => {
    if (!loading) {
      console.log(`Price feed: ${price}`);
    }
  }, [loading, price]);
    
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
