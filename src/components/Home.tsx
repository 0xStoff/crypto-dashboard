import Image from 'next/image';
import React from 'react';

import { AddressInterface, AddressString, AddressTokenData } from '../interfaces/interfaces';
import { uniqueTokenData } from '../utils/utils';

import { AddressItem, Tag } from './AddressItem';
import { Token } from './Token';

interface RenderCardsProps {
  balances: Array<AddressTokenData>;
  addressList: Array<AddressInterface>;
  setAddressList: (value: Array<AddressInterface>) => void;
}

interface RenderFormProps {
  formVisible: boolean;
  setAddress: React.Dispatch<React.SetStateAction<AddressString>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setAddressList: (value: Array<AddressInterface>) => void;
  address: AddressString;
  tag: string;
  addressList: Array<AddressInterface>;
}

interface RenderButtonsProps {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  listVisible: boolean;
  setListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RenderAddressListProps {
  addressList: Array<AddressInterface>;
  setAddressList: (value: Array<AddressInterface>) => void;
}

export const renderPriceList = () => (
  <div className="list">
    {uniqueTokenData.map((balance) => (
      <div key={balance.token}
        className="flex">
        <div className="flex">
          <Image alt="token icon"
            className="token-list"
            src={balance.icon || ''}/>
          <h2>{balance.name}</h2>
        </div>
        <p className="price">$ {balance.price}</p>
      </div>
    ))}
  </div>
);

export const renderNetWorth = (netWorth: number) => (
  <div className="card-outline">
    <div>
      <h1>Net Worth</h1>
      <p className="worth">${netWorth}</p>
    </div>
  </div>
);

export const renderForm = ({
  formVisible,
  setAddress,
  setTag,
  setAddressList,
  address,
  tag,
  addressList
}: RenderFormProps) => (
  <div className={`form-container list ${formVisible ? 'visible' : ''}`}>
    <input
      type="text"
      className="eth-address-input"
      placeholder="add eth address to track"
      onChange={(e) => setAddress(e.target.value as AddressString)}
    />
    <input
      type="text"
      className="eth-address-tag"
      placeholder="tag"
      onChange={(e) => setTag(e.target.value)}
    />
    <button
      onClick={() => setAddressList([...addressList, { address, tag }])}
      className="submit-button"
    >
      Add
    </button>
  </div>
);

export const renderButtons = ({
  formVisible,
  setFormVisible,
  listVisible,
  setListVisible,
}: RenderButtonsProps) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
      onClick={() => setFormVisible(!formVisible)}
      className="toggle-form-button"
    >
      {formVisible ? '-' : '+'}
    </button>

    <button
      onClick={() => setListVisible(!listVisible)}
      className="toggle-list-button"
    >
      {listVisible ? 'ꜜ' : 'ꜛ'}
    </button>
  </div>
);

export const renderAddressList = ({
  addressList,
  setAddressList,
}: RenderAddressListProps) => (
  <div className="list">
    {addressList.map(({ address, tag }) => (
      <AddressItem
        key={address}
        address={address}
        tag={tag}
        setAddressList={setAddressList}
        addressList={addressList}
      />
    ))}
  </div>
);

export const renderCards = (
  { balances, addressList, setAddressList }: RenderCardsProps,
) =>
  balances.map(({ address, tokenData }) => {
    const addressData = addressList.find((item) => item.address === address);
    const tag = addressData ? addressData.tag : '';
    return (
      <div key={address}>
        <br/>
        <br/>
        <div className="token-list-grid">
          <div className="card-badge">
            <Tag
              tag={tag}
              setAddressList={setAddressList}
              addressList={addressList}
              address={address}
            />
          </div>
          {tokenData.map((token) => (
            <Token
              key={token.token}
              tokenBalanceData={token}
            />
          ))}
        </div>
      </div>
    );
  });

// import Image from 'next/image';
// import React, { SetStateAction } from 'react';
//
// import { uniqueTokenData } from '../utils/utils';
//
// import { AddressItem, Tag } from './AddressItem';
// import { Token } from './Token';
//
// export const renderPriceList = () => (
//   <div className="list">
//     {uniqueTokenData.map((balance) => (
//       <div key={balance.token}
//            className="flex">
//         <div className="flex">
//           <Image alt="token icon"
//                  className="token-list"
//                  src={balance.icon}/>
//           <h2>{balance.name}</h2>
//         </div>
//         <p className="price">$ {balance.price}</p>
//       </div>))}
//   </div>);
//
// export const renderNetWorth = (netWorth: number) => (
//   <div className="card-outline">
//     <div>
//       <h1>Net Worth</h1>
//       <p className="worth">${netWorth}</p>
//     </div>
//   </div>);
//
// export const renderForm = (formVisible: boolean, setAddress, setTag, setAddressList) => (
//   <div className={`form-container list ${formVisible ? 'visible' : ''}`}>
//     <input
//       type="text"
//       className="eth-address-input"
//       placeholder="add eth address to track"
//       onChange={(e) => setAddress(e.target.value)}
//     />
//     <input
//       type="text"
//       className="eth-address-tag"
//       placeholder="tag"
//       onChange={(e) => setTag(e.target.value)}
//     />
//     <button
//       onClick={() => setAddressList([...addressList, { address, tag }])}
//       className="submit-button"
//     >
//       Add
//     </button>
//   </div>
// );
//
// export const renderButtons = ({ formVisible, setFormVisible }, { listVisible, setListVisible }) => (
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     <button onClick={() => setFormVisible(!formVisible)}
//             className="toggle-form-button">
//       {formVisible ? '-' : '+'}
//     </button>
//
//     <button onClick={() => setListVisible(!listVisible)}
//             className="toggle-list-button">
//       {listVisible ? 'ꜜ' : 'ꜛ'}
//     </button>
//   </div>
// );
//
// export const renderAddressList = ({ addressList, setAddressList }) => (
//   <div className="list">
//     {addressList.map(({ address, tag }) => (
//       <AddressItem
//         key={address}
//         address={address}
//         tag={tag}
//         setAddressList={setAddressList}
//         addressList={addressList}
//       />))}
//   </div>);
//
// export const renderCards = (balances, { addressList, setAddressList }) =>
//   balances.map(({ address, tokenData }) => {
//     const { tag } = addressList.find((item) => item.address === address);
//     return (
//       <div key={address}>
//         <br/>
//         <br/>
//         <div className="token-list-grid">
//           <div className="card-badge">
//             <Tag
//               tag={tag}
//               setAddressList={setAddressList}
//               addressList={addressList}
//               address={address}
//             />
//           </div>
//           {tokenData.map((token) => (
//             <Token key={token.token}
//                    tokenBalanceData={token}/>
//           ))}
//         </div>
//       </div>);
//   });
