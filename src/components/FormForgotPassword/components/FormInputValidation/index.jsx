import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { LOGIN_PASSWORD_NAME_FIELD } from '../../../../constants';
import HiddenIcon from '../../../../assets/icons/eye-hidden-icon.svg';
import ShowIcon from '../../../../assets/icons/eye-show-icon.svg';

const FormInputValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  checkFormInputValidation,
}) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const isPasswordField = (name) => name === LOGIN_PASSWORD_NAME_FIELD;

  const handleOnChange = (e, field) => {
    const { value, name } = e.target;
    const valueTrim = value.trim();

    const newInformation = {
      ...information,
      [name]: valueTrim,
    };
    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      valueTrim,
      field,
      validation
    );
    setValidation(newValidation);
  };

  const handleOnBlur = (e, field) => {
    const { value } = e.target;
    const valueTrim = value.trim();

    const newValidation = checkFormInputValidation(
      valueTrim,
      field,
      validation
    );
    setValidation(newValidation);
  };

  const handleToggle = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <FormGroupStyled>
      <FormLabel>
        {field.label}
        <span>*</span>
      </FormLabel>
      <FormControl
        type={
          isPasswordField(field.name) && isShowPassword ? 'text' : field.type
        }
        name={field.name}
        placeholder={field.placeholder}
        isInvalid={validation[field.name]}
        onChange={(e) => handleOnChange(e, field)}
        onBlur={(e) => handleOnBlur(e, field)}
      />
      {isPasswordField(field.name) && (
        <ShowHideIcon
          src={isShowPassword ? ShowIcon : HiddenIcon}
          width={24}
          height={24}
          alt=""
          onClick={handleToggle}
        />
      )}
      <FormControlFeedback hidden={false} type="invalid">
        {validation[field.name]}
      </FormControlFeedback>
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 32px;
  position: relative;
`;
const FormLabel = styled(Form.Label)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);

  span {
    color: var(--ds-c-yellow);
  }

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;
  }
`;
const FormControl = styled(Form.Control)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);
  height: 40px;
  border: 1px solid var(--ds-c-grey-disabled);
  border-radius: 12px;
  padding-right: 64px;
  background: var(--ds-c-white);

  &:focus {
    border: 1px solid var(--ds-c-grey-dark) !important;
    outline: none !important;
    box-shadow: none !important;
  }

  &:invalid,
  &:invalid:focus,
  &.is-invalid {
    border: 1px solid var(--ds-c-red) !important;
    outline: none !important;
    box-shadow: none !important;
    background-image: none !important;
  }

  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--ds-c-grey-hover);

    @media screen and (min-width: 1024px) {
      font-size: 16px;
      line-height: 19px;
    }
  }

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;
  }
`;
const FormControlFeedback = styled(Form.Control.Feedback)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-red);

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const ShowHideIcon = styled.img`
  position: absolute;
  right: 8px;
  top: 38px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: var(--ds-c-white);
`;

export default FormInputValidation;
