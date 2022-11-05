import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import {
  REGISTER_ADDRESS_FINDER_NAME_FIELD,
  REGISTER_ADDRESS_SWITCH_FIELD,
} from '../../../../../constants';
import SwitchCheckedIcon from '../../../../../assets/icons/switch-checked-icon.svg';
import SwitchboxIcon from '../../../../../assets/icons/switchbox-icon.svg';
import useStore from '../../../../../hooks/useStore';
import { SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED } from '../../../../../store/action';

const FormInputAddressSwitch = ({ information, setInformation }) => {
  const { state, dispatch } = useStore();
  const { isRegisterEnterAddressManuallySelected } = state;

  const handleSwitchChange = () => {
    const newInformation = {
      ...information,
    };

    delete newInformation[REGISTER_ADDRESS_FINDER_NAME_FIELD];

    setInformation(newInformation);

    dispatch({
      type: SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED,
      payload: !isRegisterEnterAddressManuallySelected,
    });
  };

  return (
    <FormGroupStyled>
      <FormSwitch
        className={isRegisterEnterAddressManuallySelected && 'active'}
        type="switch"
        label="Enter your address manually"
        name={REGISTER_ADDRESS_SWITCH_FIELD}
        checked={isRegisterEnterAddressManuallySelected}
        onClick={handleSwitchChange}
        readOnly
      />
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 24px;
  position: relative;
`;

const FormSwitch = styled(Form.Check)`
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

  input:checked[type='checkbox'] {
    background-image: url(${SwitchCheckedIcon}) !important;
    background-position: center !important;
  }

  input {
    border: none;
    border-radius: 2px;
    background-image: url(${SwitchboxIcon}) !important;
    background-position: center !important;
    width: 32px;
    height: 19px;

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

export default FormInputAddressSwitch;
