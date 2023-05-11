import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import useOutsideClick from '../hooks/useOutsideClick';
import { Address, AddressString, TokenData } from '../interfaces/interfaces';
import { uniqueTokenData } from '../utils/utils';

import { ActionMenu } from './ActionMenu';

interface AddressListProps {
    addressList: Array<Address>;
    setAddressList: (value: Array<Address>) => void;
}

interface TagProps {
    address: AddressString;
    addressList: Array<Address>;
    setAddressList: (addressList: Array<Address>) => void;
    tag: string;
}

interface AddressItemProps {
    address: AddressString;
    addressList: Array<Address>;
    tag: string;
    setAddressList: (addressList: Array<Address>) => void;
}

interface PriceAndAddressListProps extends AddressListProps {
    listVisible: boolean;
    tokens: Array<TokenData>;
}

export const Tag: React.FC<TagProps> = ({ address, addressList, setAddressList, tag }) => {
  const [tagName, setTagName] = useState(tag);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.width = '0px';
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
      inputRef.current.style.border = '0.1px solid white';
    }
  }, [showInput]);

  const changeTagName = (event?: React.FocusEvent<HTMLInputElement>) => {
    setShowInput(false);

    setAddressList(
      addressList.map((item) =>
        item.address === address ? { ...item, tag: tagName } : item
      )
    );
    event?.target.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    input.style.width = '0px';
    input.style.width = `${input.scrollWidth}px`;
    setTagName(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeTagName();
      event.currentTarget.blur();
    }
  };

  return showInput ? (
    <input
      ref={inputRef}
      onBlur={changeTagName}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className="address-tag-input badge"
      value={tagName}
    />
  ) : (
    <button
      className="address-tag-input badge"
      onClick={() => setShowInput(true)}>
      {tag}
    </button>
  );
};

export const AddressItem: React.FC<AddressItemProps> = ({
  address,
  addressList,
  tag,
  setAddressList,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const addressItemRef = useOutsideClick(() => setShowActionMenu(false));

  const handleAddressItemClick = () => {
    setShowActionMenu(!showActionMenu);
  };

  return (
    <div className="address-item"
      ref={addressItemRef}>
      <Tag
        tag={tag}
        setAddressList={setAddressList}
        addressList={addressList}
        address={address}
      />
      <button
        onClick={() => navigator.clipboard.writeText(address)}
        className="address-text"
      >
        {address}
      </button>
      <button onClick={handleAddressItemClick}
        className="context-button">
                ⋮
      </button>
      {showActionMenu && (
        <ActionMenu
          address={address}
          setAddressList={setAddressList}
          addressList={addressList}
        />
      )}
    </div>
  );
};
const AddressList = ({
  addressList,
  setAddressList
}: AddressListProps) => (
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
const PriceList: React.FC<{ tokens: Array<TokenData> }> = ({ tokens }) => (
  <div className="list">
    {uniqueTokenData(tokens).map((balance) => (
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

export const PriceAndAddressList: React.FC<PriceAndAddressListProps> = ({ listVisible, addressList, setAddressList, tokens }) => (
  <div className={`container-list ${listVisible ? 'visible' : ''}`}>
    <PriceList tokens={tokens} />
    <AddressList
      addressList={addressList}
      setAddressList={setAddressList}
    />
  </div>
);
