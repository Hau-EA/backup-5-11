import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import FormInputAddressPostcodeValidation from '../FormInputAddressPostcodeValidation';
import useStore from '../../../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';
import { resetBackdropStore } from '../../../../../constants/common';
import {
  REGISTER_ADDRESS_STATE_NAME_FIELD,
  REGISTER_ADDRESS_SUBURB_NAME_FIELD,
} from '../../../../../constants';

const CustomAddressPostcodeDropdown = ({
  field,
  information,
  validation,
  setInformation,
  setValidation,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const [postcodeSuggestion, setPostcodeSuggestion] = useState(null);

  const handlePostcodeSelected = (e, postcodeObj, field) => {
    e.preventDefault();

    const { postcode, locality, state } = postcodeObj;

    document.getElementsByName(field.name)[0].value = postcode;

    const newInformation = {
      ...information,
      [field.name]: postcode,
      [REGISTER_ADDRESS_SUBURB_NAME_FIELD]: locality,
      [REGISTER_ADDRESS_STATE_NAME_FIELD]: state,
    };
    setInformation(newInformation);

    let newValidation = checkFormInputValidation(postcode, field, validation);

    newValidation = {
      ...newValidation,
      [field.name]: '',
      [REGISTER_ADDRESS_SUBURB_NAME_FIELD]: '',
      [REGISTER_ADDRESS_STATE_NAME_FIELD]: '',
    };
    setValidation(newValidation);

    dispatch({
      type: SET_SHOW_BACKDROP,
      payload: resetBackdropStore,
    });
  };

  return (
    <AddressDropdownStyled>
      <FormInputAddressPostcodeValidation
        field={field}
        information={information}
        setInformation={setInformation}
        validation={validation}
        setValidation={setValidation}
        setPostcodeSuggestion={setPostcodeSuggestion}
        checkFormInputValidation={checkFormInputValidation}
      />
      <DropdownMenu
        show={
          backdrop?.current === field.name &&
          postcodeSuggestion &&
          backdrop?.isShow
        }
      >
        {postcodeSuggestion?.map((postcode, index) => (
          <DropdownItem
            key={postcode.fullAddress}
            eventKey={index + 1}
            onClick={(e) => handlePostcodeSelected(e, postcode, field)}
          >
            {`${postcode.postcode} (${postcode.locality} ${postcode.state})`}
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

export default CustomAddressPostcodeDropdown;
