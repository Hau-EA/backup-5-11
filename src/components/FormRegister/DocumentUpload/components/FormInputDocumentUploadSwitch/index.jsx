import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import RadioCheckedIcon from '../../../../../assets/icons/radio-checked-icon.svg';
import RadioboxIcon from '../../../../../assets/icons/radiobox-icon.svg';
import {
  REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD,
  REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD,
  REGISTER_DRIVER_LICENCE_SWITCH_FIELD,
  REGISTER_PASSPORT_NAME_FIELD,
} from '../../../../../constants';
import useStore from '../../../../../hooks/useStore';
import { SET_REGISTER_DRIVER_LICENCE_SELECTED } from '../../../../../store/action';

const FormInputDocumentUploadSwitch = ({
  information,
  setInformation,
  validation,
  handleDisallowNextStep,
}) => {
  const { state, dispatch } = useStore();
  const { isRegisterDriverLicenceSelected } = state;

  const handleChangeDocumentUpload = () => {
    let newInformation = { ...information };

    if (isRegisterDriverLicenceSelected) {
      dispatch({ type: SET_REGISTER_DRIVER_LICENCE_SELECTED, payload: false });

      newInformation = {
        ...newInformation,
        [REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD]: '',
        [REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD]: '',
      };

      // delete newInformation[REGISTER_PASSPORT_NAME_FIELD];
    }

    if (!isRegisterDriverLicenceSelected) {
      newInformation = {
        ...information,
        [REGISTER_PASSPORT_NAME_FIELD]: '',
      };

      // delete newInformation[REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD];
      // delete newInformation[REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD];

      dispatch({ type: SET_REGISTER_DRIVER_LICENCE_SELECTED, payload: true });
    }

    setInformation(newInformation);

    handleDisallowNextStep(information, validation);
  };

  return (
    <FormGroupStyled>
      <FormLabel>File type</FormLabel>
      <FormCheck
        className={isRegisterDriverLicenceSelected && 'active'}
        inline
        type="radio"
        label="Your driver licence"
        name={REGISTER_DRIVER_LICENCE_SWITCH_FIELD}
        defaultChecked={isRegisterDriverLicenceSelected}
        onClick={handleChangeDocumentUpload}
      />
      <FormCheck
        className={!isRegisterDriverLicenceSelected && 'active'}
        inline
        type="radio"
        label="Your passport"
        name={REGISTER_DRIVER_LICENCE_SWITCH_FIELD}
        defaultChecked={!isRegisterDriverLicenceSelected}
        onClick={handleChangeDocumentUpload}
      />
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 12px;
  position: relative;

  img {
    width: 100%;
    height: 230px;
    object-fit: contain;
    border-radius: 12px;
  }
`;
const FormLabel = styled(Form.Label)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  display: block;
  color: var(--ds-c-grey-dark);
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

  input:checked[type='radio'] {
    background-image: url(${RadioCheckedIcon}) !important;
    background-position: center !important;
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
  }

  &.active {
    label {
      font-weight: 700;
    }
  }
`;

export default FormInputDocumentUploadSwitch;
