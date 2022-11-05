import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {
  REGISTER_EMAIL_NAME_FIELD,
  REGISTER_LOGIN_DETAILS_FIELDS,
} from '../../../../constants';

import useStore from '../../../../hooks/useStore';
import { SET_REGISTER_INFORMATION } from '../../../../store/action';
import { api } from '@ea-fronts/api';
import ButtonCommon from '../../../common/ButtonCommon';
import FormInputValidation from '../components/FormInputValidation';
import FormInputInformCheckbox from '../components/FormInputInformCheckbox';
import {
  RESET_REGISTER_INFORMATION_STORE,
  REGISTER_STEP_REFERENCE,
  REGISTER_REEMAIL_NAME_FIELD,
  REGISTER_MOBILE_NAME_FIELD,
} from '../../../../constants/form';

const NUMBER_VALUE_LIMIT = 10;

const initialFormField = RESET_REGISTER_INFORMATION_STORE.logInDetails;

const LogInDetailsMobile = ({ currentStep, setCurrentStep }) => {
  const { state, dispatch } = useStore();
  const { registerInformation } = state;

  const [information, setInformation] = useState(initialFormField);
  const [validation, setValidation] = useState(initialFormField);
  const [isEmailExisted, setEmailExisted] = useState(false);

  useEffect(() => {
    const informationStore = registerInformation.logInDetails;
    setInformation(informationStore);
  }, [registerInformation]);

  const handleEmailValueValidation = (value, name, information, validation) => {
    if (value && name === REGISTER_EMAIL_NAME_FIELD) {
      const isValid = Boolean(
        REGISTER_LOGIN_DETAILS_FIELDS[0].checkValidFn(value)
      );

      if (!isValid) {
        validation = {
          ...validation,
          [name]: REGISTER_LOGIN_DETAILS_FIELDS[0].msgInvalid,
        };
      }

      if (isValid) {
        validation = {
          ...validation,
          [name]: '',
        };
      }

      if (information[REGISTER_REEMAIL_NAME_FIELD]) {
        if (value === information[REGISTER_REEMAIL_NAME_FIELD]) {
          validation = {
            ...validation,
            [REGISTER_REEMAIL_NAME_FIELD]: '',
          };

          return validation;
        }

        if (value !== information[REGISTER_REEMAIL_NAME_FIELD]) {
          validation = {
            ...validation,
            [REGISTER_REEMAIL_NAME_FIELD]:
              REGISTER_LOGIN_DETAILS_FIELDS[1].msgNotMatch,
          };
        }
      }
    }

    return validation;
  };

  const handleReemailValueValidation = (
    value,
    name,
    information,
    validation
  ) => {
    if (value && name === REGISTER_REEMAIL_NAME_FIELD) {
      const isValid = Boolean(
        REGISTER_LOGIN_DETAILS_FIELDS[1].checkValidFn(value)
      );

      if (!isValid) {
        validation = {
          ...validation,
          [name]: REGISTER_LOGIN_DETAILS_FIELDS[1].msgInvalid,
        };

        return validation;
      }

      if (isValid) {
        validation = {
          ...validation,
          [name]: '',
        };
      }

      if (information[REGISTER_EMAIL_NAME_FIELD]) {
        if (value !== information[REGISTER_EMAIL_NAME_FIELD]) {
          validation = {
            ...validation,
            [name]: REGISTER_LOGIN_DETAILS_FIELDS[1].msgNotMatch,
          };
        }
      }
    }

    return validation;
  };

  const handleMobileValueValidation = (
    value,
    name,
    information,
    validation
  ) => {
    if (value && name === REGISTER_MOBILE_NAME_FIELD) {
      if (value) {
        validation = {
          ...validation,
          [name]: '',
        };
      }

      if (value.length < NUMBER_VALUE_LIMIT) {
        validation = {
          ...validation,
          [name]: REGISTER_LOGIN_DETAILS_FIELDS[2].msgInvalid,
        };
      }

      if (value.length === NUMBER_VALUE_LIMIT) {
        const isValid = Boolean(
          REGISTER_LOGIN_DETAILS_FIELDS[2].checkValidFn(
            value,
            information[name]
          )
        );

        validation = {
          ...validation,
          [name]: isValid ? '' : REGISTER_LOGIN_DETAILS_FIELDS[2].msgStartWith,
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

  const checkFormInputValidation = (value, field, information, validation) => {
    const { name, msgRequired } = field;

    validation = handleFieldEmptyValidation(
      value,
      name,
      validation,
      msgRequired
    );

    validation = handleEmailValueValidation(
      value,
      name,
      information,
      validation
    );

    validation = handleReemailValueValidation(
      value,
      name,
      information,
      validation
    );

    validation = handleMobileValueValidation(
      value,
      name,
      information,
      validation
    );

    return validation;
  };

  const handleNext = async () => {
    const isAllowSubmit = Object.values(information).some((value) => value);

    if (isAllowSubmit) {
      try {
        const { data } = await api.isUsernameValid(
          information[REGISTER_EMAIL_NAME_FIELD]
        );

        if (data?.valid) {
          dispatch({
            type: SET_REGISTER_INFORMATION,
            payload: { [REGISTER_STEP_REFERENCE[currentStep]]: information },
          });

          setCurrentStep(currentStep + 1);
        } else {
          const newValidation = {
            ...validation,
            [REGISTER_EMAIL_NAME_FIELD]:
              REGISTER_LOGIN_DETAILS_FIELDS[0].msgExisted,
          };
          setValidation(newValidation);

          setEmailExisted(true);
        }
      } catch (error) {
        console.error(error?.message);
      }
    }

    if (!isAllowSubmit) {
      let newValidation = { ...validation };

      REGISTER_LOGIN_DETAILS_FIELDS.forEach((field) => {
        newValidation = checkFormInputValidation(
          information[field.name],
          field,
          information,
          newValidation
        );
      });

      setValidation(newValidation);
    }
  };

  return (
    <LogInDetailsMobileStyled>
      <Title>Login details</Title>
      {REGISTER_LOGIN_DETAILS_FIELDS.map((field) => (
        <FormInputValidation
          key={field.name}
          field={field}
          information={information}
          setInformation={setInformation}
          validation={validation}
          setValidation={setValidation}
          isEmailExisted={isEmailExisted}
          setEmailExisted={setEmailExisted}
          checkFormInputValidation={checkFormInputValidation}
        />
      ))}
      <FormInputInformCheckbox />
      <NextWrap>
        <ButtonCommon
          value="Next"
          onClick={handleNext}
          styles={{
            margin: '0px',
            fontSize: '14px',
            width: '159px',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </NextWrap>
    </LogInDetailsMobileStyled>
  );
};

const LogInDetailsMobileStyled = styled(Form)`
  position: relative;
  width: 100%;
  height: fit-content;
`;

const Title = styled.h1`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  display: flex;
  align-items: center;
  color: var(--ds-c-grey-dark);
  margin-top: 40px;
  margin-bottom: 24px;
`;

const NextWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: calc(100% - 48px);
  height: 72px;
  background: var(--ds-c-white);
`;

export default LogInDetailsMobile;
