import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import FormInputOccupationSelectedValidation from '../FormInputOccupationSelectedValidation';
import { resetBackdropStore } from '../../../../../constants/common';
import {
  REGISTER_OCCUPATIONS,
  REGISTER_OCCUPATION_EXTRAS,
} from '../../../../../constants/form';
import {
  REGISTER_OCCUPATION_NAME_FIELD,
  REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS,
  REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD,
} from '../../../../../constants';
import useStore from '../../../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';

const CustomOccupationDropdown = ({
  information,
  validation,
  setInformation,
  setValidation,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const isOccupationField = (field) =>
    field.name === REGISTER_OCCUPATION_NAME_FIELD;

  const isPreviousOccupationField = (field) =>
    field.name === REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD;

  const isHidePreviousOccupation = (field) =>
    isPreviousOccupationField(field) &&
    !REGISTER_OCCUPATION_EXTRAS.find(
      (occupationExtra) =>
        occupationExtra.value === information[REGISTER_OCCUPATION_NAME_FIELD]
    );
  const occupations = {
    [REGISTER_OCCUPATION_NAME_FIELD]: [
      ...REGISTER_OCCUPATION_EXTRAS,
      ...REGISTER_OCCUPATIONS,
    ],
    [REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD]: REGISTER_OCCUPATIONS,
  };

  const handleOccupationSelected = (value, information, field) => {
    if (isOccupationField(field)) {
      document.getElementsByName(REGISTER_OCCUPATION_NAME_FIELD)[0].value =
        value;

      information = {
        ...information,
        [REGISTER_OCCUPATION_NAME_FIELD]: value,
      };

      const isHasPreviousOccupation = REGISTER_OCCUPATION_EXTRAS.find(
        (occupationExtra) =>
          occupationExtra.value === information[REGISTER_OCCUPATION_NAME_FIELD]
      );

      if (isHasPreviousOccupation) {
        information = {
          ...information,
          [REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD]: '',
        };
      }

      if (!isHasPreviousOccupation) {
        delete information[REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD];

        document
          .getElementsByName(REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD)[0]
          .remove();
      }

      return information;
    }

    return information;
  };

  const handlePreviousOccupationSelected = (value, information, field) => {
    if (isPreviousOccupationField(field)) {
      document.getElementsByName(
        REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD
      )[0].value = value;

      information = {
        ...information,
        [REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD]: value,
      };
    }

    return information;
  };

  const handleSelected = (e, occupation, field) => {
    e.preventDefault();

    let newInformation = { ...information };

    newInformation = handleOccupationSelected(
      occupation,
      newInformation,
      field
    );

    newInformation = handlePreviousOccupationSelected(
      occupation,
      newInformation,
      field
    );

    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      occupation,
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
    <>
      {REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS.map((occupationField) => (
        <AddressDropdownStyled
          key={occupationField.name}
          isHidden={isHidePreviousOccupation(occupationField)}
        >
          <FormInputOccupationSelectedValidation
            field={occupationField}
            information={information}
            setInformation={setInformation}
            validation={validation}
            setValidation={setValidation}
            checkFormInputValidation={checkFormInputValidation}
          />
          <DropdownMenu
            show={
              backdrop?.current === occupationField.name && backdrop?.isShow
            }
          >
            {occupations[occupationField.name].map((occupation, index) => (
              <DropdownItem
                key={occupation.text}
                eventKey={index + 1}
                onClick={(e) =>
                  handleSelected(e, occupation.value, occupationField)
                }
              >
                {occupation.value}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </AddressDropdownStyled>
      ))}
    </>
  );
};

const AddressDropdownStyled = styled.div`
  position: relative;
  width: 100%;

  display: ${(props) => props.isHidden && 'none'};
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

export default CustomOccupationDropdown;
