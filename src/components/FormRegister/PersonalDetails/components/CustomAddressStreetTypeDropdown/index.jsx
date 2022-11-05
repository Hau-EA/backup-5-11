import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { resetBackdropStore } from '../../../../../constants/common';
import { REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD } from '../../../../../constants';
import useStore from '../../../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';
import FormInputAddressStreetTypeValidation from '../FormInputAddressStreetTypeValidation';

const CustomAddressStreetTypeDropdown = ({
  field,
  information,
  validation,
  setInformation,
  setValidation,
  streetTypeSuggestion,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const handleStreetTypeSelected = (value, information, field) => {
    document.getElementsByName(
      REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD
    )[0].value = value;

    information = {
      ...information,
      [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: value,
    };

    return information;
  };

  const handleSelected = (e, streetType, field) => {
    e.preventDefault();

    let newInformation = { ...information };

    newInformation = handleStreetTypeSelected(
      streetType,
      newInformation,
      field
    );

    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      streetType,
      field,
      validation
    );
    setValidation(newValidation);

    dispatch({
      type: SET_SHOW_BACKDROP,
      payload: resetBackdropStore,
    });
  };

  return (
    <AddressDropdownStyled>
      <FormInputAddressStreetTypeValidation
        field={field}
        information={information}
        setInformation={setInformation}
        validation={validation}
        setValidation={setValidation}
        streetTypeSuggestion={streetTypeSuggestion}
        checkFormInputValidation={checkFormInputValidation}
      />
      <DropdownMenu
        show={
          backdrop?.current === field.name &&
          streetTypeSuggestion &&
          backdrop?.isShow
        }
      >
        {streetTypeSuggestion?.map((streetType, index) => (
          <DropdownItem
            key={streetType}
            eventKey={index + 1}
            onClick={(e) => handleSelected(e, streetType, field)}
          >
            {streetType}
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

export default CustomAddressStreetTypeDropdown;
