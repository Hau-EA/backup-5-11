import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import FormInputAddressFinderValidation from '../FormInputAddressFinderValidation';
import {
  REGISTER_ADDRESS_FINDER_NAME_FIELD,
  REGISTER_ADDRESS_POST_CODE_NAME_FIELD,
  REGISTER_ADDRESS_STATE_NAME_FIELD,
  REGISTER_ADDRESS_STREET_NAME_NAME_FIELD,
  REGISTER_ADDRESS_STREET_NO_NAME_FIELD,
  REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD,
  REGISTER_ADDRESS_SUBURB_NAME_FIELD,
  REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD,
} from '../../../../../constants';
import useStore from '../../../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';
import { resetBackdropStore } from '../../../../../constants/common';

const CustomAddressFinderDropdown = ({
  information,
  setInformation,
  validation,
  setValidation,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const [addressSuggestion, setAddressSuggestion] = useState(null);

  const addressDecomposition = (address) => {
    const addressPaths = address.split(',');
    const streetNo = addressPaths[0].split(' ')[0];
    const streetName = addressPaths[0].split(' ').slice(1, -1).join(' ');
    const streetType = addressPaths[0].split(' ').slice(-1).join(' ');

    const suburb = addressPaths[1].trim().split(' ')[0];
    const state = addressPaths[1].trim().split(' ').slice(1, -1).join(' ');
    const postCode = addressPaths[1].trim().split(' ').slice(-1).join(' ');

    return { streetNo, streetName, streetType, postCode, suburb, state };
  };

  const handleAddressSelected = (e, address, field) => {
    e.preventDefault();

    document.getElementsByName(REGISTER_ADDRESS_FINDER_NAME_FIELD)[0].value =
      address;

    const { streetNo, streetName, streetType, postCode, suburb, state } =
      addressDecomposition(address);

    const newInformation = {
      ...information,
      [REGISTER_ADDRESS_FINDER_NAME_FIELD]: address,
      [REGISTER_ADDRESS_STREET_NO_NAME_FIELD]: streetNo,
      [REGISTER_ADDRESS_STREET_NAME_NAME_FIELD]: streetName,
      [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: streetType,
      [REGISTER_ADDRESS_POST_CODE_NAME_FIELD]: postCode,
      [REGISTER_ADDRESS_SUBURB_NAME_FIELD]: suburb,
      [REGISTER_ADDRESS_STATE_NAME_FIELD]: state,
    };
    setInformation(newInformation);

    let newValidation = {
      ...validation,
      [REGISTER_ADDRESS_STREET_NO_NAME_FIELD]: '',
      [REGISTER_ADDRESS_STREET_NAME_NAME_FIELD]: '',
      [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: '',
      [REGISTER_ADDRESS_POST_CODE_NAME_FIELD]: '',
      [REGISTER_ADDRESS_SUBURB_NAME_FIELD]: '',
      [REGISTER_ADDRESS_STATE_NAME_FIELD]: '',
    };

    newValidation = checkFormInputValidation(address, field, validation);

    setValidation(newValidation);

    dispatch({
      type: SET_SHOW_BACKDROP,
      payload: resetBackdropStore,
    });
  };

  return (
    <AddressDropdownStyled>
      <FormInputAddressFinderValidation
        field={REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD}
        information={information}
        setInformation={setInformation}
        validation={validation}
        setValidation={setValidation}
        setAddressSuggestion={setAddressSuggestion}
        checkFormInputValidation={checkFormInputValidation}
      />
      <DropdownMenu
        show={
          backdrop?.current ===
            REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD.name &&
          addressSuggestion &&
          backdrop?.isShow
        }
      >
        {addressSuggestion?.map((address, index) => (
          <DropdownItem
            key={address.id}
            eventKey={index + 1}
            onClick={(e) =>
              handleAddressSelected(
                e,
                address.fullAddress,
                REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD
              )
            }
          >
            {address.fullAddress}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </AddressDropdownStyled>
  );
};

const AddressDropdownStyled = styled.div`
  position: relative;
  width: 100%;
`;
const DropdownMenu = styled(Dropdown.Menu)`
  padding: 0;
  border: none;
  box-shadow: var(--ds-box-shadow-4);
  max-height: 160px;
  border-radius: 0.375rem;
  width: 100%;
  overflow: auto;
  background: var(--ds-c-white);
  inset: 0px auto auto 0px !important;
  transform: translate(0px, 67px) !important;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--ds-c-grey-hover);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
const DropdownItem = styled(Dropdown.Item)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: var(--ds-c-grey-dark);

  display: flex;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
  height: 40px;
  background: var(--ds-bg);

  a:first-child {
    border-radius: 0.375rem 0.375rem 0 0;
  }

  &:hover {
    background: var(--ds-bg-hover);
  }

  &:active {
    color: var(--ds-c-grey-dark);
  }
`;

export default CustomAddressFinderDropdown;
