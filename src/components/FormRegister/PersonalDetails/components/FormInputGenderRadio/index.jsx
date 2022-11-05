import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { REGISTER_GENDER_NAME_FIELD } from '../../../../../constants';
import RadioCheckedIcon from '../../../../../assets/icons/radio-checked-icon.svg';
import RadioboxIcon from '../../../../../assets/icons/radiobox-icon.svg';

const MALE = 'male';
const FEMALE = 'female';

const FormInputGenderRadio = ({
  information,
  setInformation,
  validation,
  setValidation,
  handleDisallowNextStep,
}) => {
  const isMale = information[REGISTER_GENDER_NAME_FIELD] === MALE;
  const isFemale = information[REGISTER_GENDER_NAME_FIELD] === FEMALE;

  const handleGenderChange = (value) => {
    const newInformation = {
      ...information,
      [REGISTER_GENDER_NAME_FIELD]: value,
    };
    setInformation(newInformation);

    const newValidation = {
      ...validation,
      [REGISTER_GENDER_NAME_FIELD]: '',
    };
    setValidation(newValidation);

    handleDisallowNextStep(newInformation, newValidation);
  };

  return (
    <FormGroupStyled>
      <FormLabel>
        Gender
        <span>*</span>
      </FormLabel>
      <FormCheck
        className={isMale && 'active'}
        inline
        type="radio"
        label="Male"
        name={REGISTER_GENDER_NAME_FIELD}
        checked={isMale}
        onClick={() => handleGenderChange(MALE)}
        readOnly
      />
      <FormCheck
        className={isFemale && 'active'}
        inline
        type="radio"
        label="Female"
        name={REGISTER_GENDER_NAME_FIELD}
        defaultChecked={isFemale}
        onClick={() => handleGenderChange(FEMALE)}
        readOnly
      />
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 24px;
  position: relative;
`;
const FormLabel = styled(Form.Label)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  display: block;
  color: var(--ds-c-grey-dark);

  span {
    color: var(--ds-c-yellow);
  }
`;
const FormCheck = styled(Form.Check)`
  margin: 0;
  margin-right: 44px;

  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--ds-c-grey-dark);
    margin-left: 0px;
  }

  input {
    border: none;
    border-radius: 2px;
    background-image: url(${RadioboxIcon}) !important;
    background-position: center !important;
    width: 16px;
    height: 16px;

    &:focus,
    &:active,
    &:checked {
      background-color: transparent;
      border: none;
      border-radius: 2px;
      box-shadow: none !important;
      filter: none !important;
    }

    &:checked[type='radio'] {
      background-image: url(${RadioCheckedIcon}) !important;
      background-position: center !important;
    }
  }

  &.active {
    label {
      font-weight: 700;
    }
  }
`;

export default FormInputGenderRadio;
