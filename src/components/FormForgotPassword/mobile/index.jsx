import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '@ea-fronts/api';
import {
  FORGOT_PASSWORD_EMAIL_NAME_FIELD,
  FORGOT_PASSWORD_FIELD,
  LOGIN_PREFIX,
  RESET_FORGOT_PASSWORD_INFORMATION,
} from '../../../constants';
import Button from 'react-bootstrap/Button';
import FormInputValidation from '../components/FormInputValidation';
import useTheme from '../../../hooks/useTheme';
import ButtonLinkCommon from '../../common/ButtonLinkCommon';

const initialField = RESET_FORGOT_PASSWORD_INFORMATION;

const FormForgotPasswordMobile = () => {
  const theme = useTheme();

  const [information, setInformation] = useState(initialField);
  const [validation, setValidation] = useState(initialField);
  const [isSendEmailSuccess, setSendEmailSuccess] = useState(false);

  const handleFieldValidation = (
    value,
    name,
    validation,
    msgInvalid,
    checkValidFn
  ) => {
    if (value) {
      const isValid = Boolean(checkValidFn(value));

      if (isValid) {
        validation = {
          ...validation,
          [name]: '',
        };
      }

      if (!isValid) {
        validation = {
          ...validation,
          [name]: msgInvalid,
        };
      }
    }

    return validation;
  };

  const handleFieldEmptyValidation = (value, name, validation, msgRequired) => {
    if (!value) {
      validation = {
        ...validation,
        [name]: msgRequired,
      };
    }

    return validation;
  };

  const checkFormInputValidation = (value, field, validation) => {
    const { name, checkValidFn, msgInvalid, msgRequired } = field;

    validation = handleFieldEmptyValidation(
      value,
      name,
      validation,
      msgRequired
    );

    validation = handleFieldValidation(
      value,
      name,
      validation,
      msgInvalid,
      checkValidFn
    );

    return validation;
  };

  const handleSubmit = async () => {
    const isAllowSubmit = Object.values(information).every((value) => value);

    if (isAllowSubmit) {
      try {
        const { data } = await api.forgotPassword(
          information[FORGOT_PASSWORD_EMAIL_NAME_FIELD]
        );

        if (data?.success) {
          setSendEmailSuccess(true);
        }
      } catch (error) {
        console.error(error);

        let newValidation = { ...validation };
        newValidation = {
          ...validation,
          [FORGOT_PASSWORD_FIELD.name]: FORGOT_PASSWORD_FIELD.msgInvalid,
        };

        setValidation(newValidation);
      }
    }

    if (!isAllowSubmit) {
      let newValidation = { ...validation };

      newValidation = checkFormInputValidation(
        information[FORGOT_PASSWORD_FIELD.name],
        FORGOT_PASSWORD_FIELD,
        newValidation
      );

      setValidation(newValidation);
    }
  };

  if (isSendEmailSuccess) {
    return (
      <>
        <Paragraph>
          We will send the instruction how to reset your password to{' '}
          {information[FORGOT_PASSWORD_EMAIL_NAME_FIELD]} if the email address
          is registered on our system.
        </Paragraph>
        <FormForgotPasswordMobileStyled>
          <BackToLogin>
            <ButtonLinkCommon
              href={`/${theme}${LOGIN_PREFIX}`}
              value="Back to login"
              styles={{
                margin: '0px',
                width: '100%',
                float: 'right',
              }}
              color="var(--ds-c-grey-dark)"
              background="var(--ds-c-yellow)"
            />
          </BackToLogin>
        </FormForgotPasswordMobileStyled>
      </>
    );
  }
  return (
    <>
      <Paragraph>
        Provide the email address you use to login and we'll help you create a
        new password.
      </Paragraph>
      <FormForgotPasswordMobileStyled>
        <FormInputValidation
          key={FORGOT_PASSWORD_FIELD.name}
          field={FORGOT_PASSWORD_FIELD}
          information={information}
          setInformation={setInformation}
          validation={validation}
          setValidation={setValidation}
          checkFormInputValidation={checkFormInputValidation}
        />
        <ResetSubmit>
          <SubmitStyled onClick={handleSubmit}>
            Reset your password
          </SubmitStyled>
        </ResetSubmit>
      </FormForgotPasswordMobileStyled>
    </>
  );
};

const FormForgotPasswordMobileStyled = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;

const ResetSubmit = styled.div`
  position: fixed;
  bottom: 16px;
  left: 24px;
  width: calc(100% - 48px);
  background: var(--ds-c-white);
`;
const BackToLogin = styled.div`
  position: fixed;
  bottom: 16px;
  left: 24px;
  width: calc(100% - 48px);
  background: var(--ds-c-white);
`;
const SubmitStyled = styled(Button)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);
  background: var(--ds-c-yellow);
  border-radius: 12px;
  height: 40px;
  width: 100%;
  padding: 10px;
  border: none;

  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background-color: var(--ds-c-yellow) !important;
    color: var(--ds-c-grey-dark) !important;
  }

  &:disabled {
    color: var(--ds-c-grey-dark) !important;
    background-color: var(--ds-c-yellow-disabled) !important;
    cursor: not-allowed !important;
  }
`;

const Paragraph = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);
  margin-bottom: 24px;
`;

export default FormForgotPasswordMobile;
