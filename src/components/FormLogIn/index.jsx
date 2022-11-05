import React, { useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { api } from '@ea-fronts/api';
import {
  ACCESS_TOKEN,
  LOGIN_FIELDS,
  LOGIN_PASSWORD_NAME_FIELD,
  LOGIN_EMAIL_NAME_FIELD,
  RESET_LOGIN_INFORMATION,
} from '../../constants';
import Cookies from '../../helpers/cookies';
import {
  FORGOT_PASSWORD_PREFIX,
  HHMT_PREFIX,
  REGISTER_PREFIX,
} from '../../constants/router';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import ButtonCommon from '../common/ButtonCommon';
import FormInputValidation from './components/FormInputValidation';
import { LOGIN_UNAUTHORIZED_INFORM } from '../../constants/form';

const initialField = RESET_LOGIN_INFORMATION;

const FormLogIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [information, setInformation] = useState(initialField);
  const [validation, setValidation] = useState(initialField);
  const [error, setError] = useState('');

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
        const { data } = await api.login(
          information[LOGIN_EMAIL_NAME_FIELD],
          information[LOGIN_PASSWORD_NAME_FIELD]
        );
        if (data?.token) {
          Cookies.set(ACCESS_TOKEN, data.token);
          navigate(HHMT_PREFIX);
        }
      } catch (error) {
        console.error(error?.message);

        setError(error?.response?.data?.message?.toLowerCase());
      }
    }

    if (!isAllowSubmit) {
      let newValidation = { ...validation };

      LOGIN_FIELDS.forEach((field) => {
        newValidation = checkFormInputValidation(
          information[field.name],
          field,
          newValidation
        );
      });

      setValidation(newValidation);
    }
  };

  return (
    <FormLogInStyled>
      {LOGIN_FIELDS.map((field) => (
        <FormInputValidation
          key={field.name}
          field={field}
          information={information}
          setInformation={setInformation}
          validation={validation}
          setValidation={setValidation}
          error={error}
          setError={setError}
          checkFormInputValidation={checkFormInputValidation}
        />
      ))}
      {LOGIN_UNAUTHORIZED_INFORM[error]}

      <ForgotPasswordSubmit>
        <LinkStyled to={`/${theme}${FORGOT_PASSWORD_PREFIX}`}>
          Forgot password?
        </LinkStyled>
        <ButtonCommon
          value="Log in"
          onClick={handleSubmit}
          styles={{
            margin: '0px',
            width: '200px',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </ForgotPasswordSubmit>
      <Register>
        Don’t have an account?{' '}
        <Link to={`/${theme}${REGISTER_PREFIX}`}>REGISTER NOW</Link>
      </Register>
    </FormLogInStyled>
  );
};

const FormLogInStyled = styled(Form)`
  position: relative;
  width: 100%;
  height: calc(100% - 96px);
`;

const LinkStyled = styled(Link)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-decoration: none;

  color: var(--ds-c-blue);
  display: block;

  &:hover {
    color: var(--ds-c-blue-hover) !important;
  }
`;

const ForgotPasswordSubmit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Register = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  position: absolute;
  bottom: 0px;
  color: var(--ds-c-grey-dark);
  margin-bottom: 0px;

  a {
    color: var(--ds-c-yellow);
    text-decoration: none;

    &:hover,
    &:active {
      color: var(--ds-c-yellow-hover) !important;
    }
  }
`;

export default FormLogIn;
