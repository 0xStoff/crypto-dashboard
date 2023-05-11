import React from 'react';

import { Address, AddressString } from '../interfaces/interfaces';

interface AddressListProps {
    addressList: Array<Address>;
    setAddressList: (value: Array<Address>) => void;
}

interface AddressProps {
    address: AddressString;
    setAddress: React.Dispatch<React.SetStateAction<AddressString>>;
}

interface ButtonsProps {
    formVisible: boolean;
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
    listVisible: boolean;
    setListVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormProps extends AddressListProps, AddressProps {
    formVisible: boolean;
    setTag: React.Dispatch<React.SetStateAction<string>>;
    tag: string;
}

export const Form = ({
  formVisible,
  setAddress,
  setTag,
  setAddressList,
  address,
  tag,
  addressList
}: FormProps) => (
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

export const Buttons = ({
  formVisible,
  setFormVisible,
  listVisible,
  setListVisible,
}: ButtonsProps) => (
  <div className='flex-container'>
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
