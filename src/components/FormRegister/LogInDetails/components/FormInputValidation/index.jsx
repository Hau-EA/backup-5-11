import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { format } from '@ea-fronts/helpers';
import {
  REGISTER_EMAIL_NAME_FIELD,
  REGISTER_MOBILE_NAME_FIELD,
} from '../../../../../constants';
import AccountExistedInform from '../AccountExistedInform';

const NUMBER_VALUE_LIMIT = 10;

const FormInputValidation = ({
  field,
  information,
  validation,
  setInformation,
  setValidation,
  isEmailExisted,
  setEmailExisted,
  checkFormInputValidation,
}) => {
  const isShowAccountExistedInform =
    isEmailExisted && field.name === REGISTER_EMAIL_NAME_FIELD;

  const handleEmailOnChange = (name, value) => {
    const isEmailField = name === REGISTER_EMAIL_NAME_FIELD;

    if (isEmailField && isEmailExisted) {
      setEmailExisted(false);
    }

    return value;
  };

  const handleMobileOnChange = (name, value) => {
    const isMobileField = name === REGISTER_MOBILE_NAME_FIELD;

    if (isMobileField) {
      const mobileStrValue = format.toMobileNumberAmount(value);

      const mobileFormatValue = (value) => format.toMobileNumberStr(value);

      if (mobileStrValue.length > NUMBER_VALUE_LIMIT) {
        document.getElementsByName(name)[0].value = mobileFormatValue(
          information[name]
        );

        value = information[name];
      } else {
        document.getElementsByName(name)[0].value =
          mobileFormatValue(mobileStrValue);

        value = mobileStrValue;
      }
    }

    return value;
  };

  const handleOnChange = (e, field) => {
    const { value, name } = e.target;
    let valueTrim = value.trim();

    valueTrim = handleEmailOnChange(name, value);

    valueTrim = handleMobileOnChange(name, valueTrim);

    const newInformation = {
      ...information,
      [name]: valueTrim,
    };
    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      newInformation[name],
      field,
      newInformation,
      validation
    );
    setValidation(newValidation);
  };

  const handleOnBlur = (e, field) => {
    const { name } = e.target;

    const newValidation = checkFormInputValidation(
      information[name],
      field,
      information,
      validation
    );
    setValidation(newValidation);
  };

  return (
    <FormGroupStyled isShowAccountExistedInform={isShowAccountExistedInform}>
      <FormLabel>
        {field.label}
        <span>*</span>
      </FormLabel>
      <FormControl
        type={field.type}
        name={field.name}
        defaultValue={information[field.name]}
        placeholder={field.placeholder}
        isInvalid={validation[field.name]}
        onChange={(e) => handleOnChange(e, field)}
        onBlur={(e) => handleOnBlur(e, field)}
      />
      <FormControlFeedback hidden={false} type="invalid">
        {validation[field.name]}
      </FormControlFeedback>
      {isShowAccountExistedInform && <AccountExistedInform />}
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: ${(props) =>
    props.isShowAccountExistedInform ? '16px' : '32px'};
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
  position: absolute;
  margin-top: 4px;
`;

export default FormInputValidation;
