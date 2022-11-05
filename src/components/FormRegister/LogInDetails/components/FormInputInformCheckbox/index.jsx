import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import CheckedIcon from '../../../../../assets/icons/checked-icon.svg';
import CheckboxIcon from '../../../../../assets/icons/checkbox-icon.svg';

const FormInputInformCheckbox = () => {
  return (
    <FormCheckStyled
      type="checkbox"
      label="Keep me informed of news and offers by email and SMS"
      checked={true}
      readOnly
    />
  );
};

const FormCheckStyled = styled(Form.Check)`
  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--ds-c-grey-dark);
    margin-left: 5.5px;
  }

  input:checked[type='checkbox'] {
    background-image: url(${CheckedIcon});
  }

  input {
    border: none;
    border-radius: 2px;
    background-image: url(${CheckboxIcon});
    width: 24px;
    height: 24px;

    &:focus,
    &:active,
    &:checked {
      background-color: transparent;
      border: none;
      border-radius: 2px;
      box-shadow: none !important;
      filter: none !important;
    }
  }
`;

export default FormInputInformCheckbox;
