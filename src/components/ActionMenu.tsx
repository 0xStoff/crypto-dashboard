import React from 'react';

import { Address, AddressString } from '../interfaces/interfaces';

interface ActionMenuProps {
  address: AddressString;
  setAddressList: (addressList: Array<Address>) => void;
  addressList: Array<Address>;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  address,
  setAddressList,
  addressList,
}) => {

  const handleRemoveAddress = () => {
    const updatedList = addressList.filter((item) => item.address !== address);
    setAddressList(updatedList);
  };

  return (
    <div className="action-menu">
      <button onClick={handleRemoveAddress}
        className="action-menu-button">
          Remove Address
      </button>
    </div>
  );
};
