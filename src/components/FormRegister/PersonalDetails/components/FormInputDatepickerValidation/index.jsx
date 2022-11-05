import React from 'react';
import styled from 'styled-components';
import {
  REGISTER_DOB_NAME_FIELD,
  REGISTER_PERSONAL_DETAILS_DOB_FIELD,
} from '../../../../../constants';
import Form from 'react-bootstrap/Form';
import CalendarIcon from '../../../../common/Icons/CalendarIcon';
import { useState } from 'react';
import CustomDatepickerSelected from '../CustomDatepickerSelected';

const AGE_MINIMUM = 18;

const FormInputDatepickerValidation = ({
  information,
  setInformation,
  validation,
  setValidation,
  checkFormInputValidation,
}) => {
  const [isOpenDatePicker, setOpenDatePicker] = useState(false);

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatDate = (date) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  };

  const handleOnChange = (e, field) => {
    const { value } = e.target;
    const date = new Date(value);
    const dateFormat = formatDate(date);
    const age = parseInt(getAge(dateFormat));
    let newValidation = { ...validation };

    if (value) {
      const newInfomation = {
        ...information,
        [REGISTER_DOB_NAME_FIELD]: dateFormat,
      };
      setInformation(newInfomation);

      newValidation = {
        ...newValidation,
        [REGISTER_DOB_NAME_FIELD]:
          age < AGE_MINIMUM
            ? REGISTER_PERSONAL_DETAILS_DOB_FIELD.msgInvalid
            : '',
      };
    }

    if (!value) {
      newValidation = checkFormInputValidation(value, field, validation);
    }

    setValidation(newValidation);
  };

  const handleOnBlur = (e, field) => {
    const { value } = e.target;

    const newValidation = checkFormInputValidation(value, field, validation);
    setValidation(newValidation);
  };

  const handleOnChangeDatePicker = (datePicked) => {
    const date = new Date(datePicked);
    const dateFormat = formatDate(date);
    const age = parseInt(getAge(dateFormat));

    document.getElementsByName(REGISTER_DOB_NAME_FIELD)[0].value = dateFormat;

    const newInfomation = {
      ...information,
      [REGISTER_DOB_NAME_FIELD]: dateFormat,
    };
    setInformation(newInfomation);

    let newValidation = { ...validation };

    newValidation = {
      ...newValidation,
      [REGISTER_DOB_NAME_FIELD]:
        age < AGE_MINIMUM ? REGISTER_PERSONAL_DETAILS_DOB_FIELD.msgInvalid : '',
    };

    setValidation(newValidation);

    setOpenDatePicker(false);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleOpenDatePicker = () => {
    setOpenDatePicker(!isOpenDatePicker);

    if (isOpenDatePicker) {
      const newValidation = checkFormInputValidation(
        '',
        REGISTER_PERSONAL_DETAILS_DOB_FIELD,
        validation
      );
      setValidation(newValidation);
    }
  };

  return (
    <FormGroupStyled>
      <FormLabel>
        Date of birth
        <span>*</span>
      </FormLabel>
      <FormControl
        type={REGISTER_PERSONAL_DETAILS_DOB_FIELD.type}
        name={REGISTER_DOB_NAME_FIELD}
        placeholder={REGISTER_PERSONAL_DETAILS_DOB_FIELD.placeholder}
        defaultValue={information[REGISTER_DOB_NAME_FIELD]}
        isInvalid={validation[REGISTER_DOB_NAME_FIELD]}
        onChange={(e) => handleOnChange(e, REGISTER_PERSONAL_DETAILS_DOB_FIELD)}
        onBlur={(e) => handleOnBlur(e, REGISTER_PERSONAL_DETAILS_DOB_FIELD)}
        onKeyDown={handleOnKeyDown}
      />
      <CalendarIcon
        color="var(--ds-c-grey-dark)"
        size={{ width: 24, height: 24 }}
        onClick={handleOpenDatePicker}
        styles={{
          position: 'absolute',
          top: '32px',
          right: '11px',
        }}
      />
      <CustomDatepickerSelected
        isOpen={isOpenDatePicker}
        date={information[REGISTER_DOB_NAME_FIELD]}
        onChange={handleOnChangeDatePicker}
      />
      <FormControlFeedback hidden={false} type="invalid">
        {validation[REGISTER_DOB_NAME_FIELD]}
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

  display: block;
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
  padding-right: 8px;
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

  &[type='date']::-webkit-calendar-picker-indicator {
    background: none !important;
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
  color: var(--ds-c-red);
  position: absolute;
  margin-top: 4px;
`;

export default FormInputDatepickerValidation;
