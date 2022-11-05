import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import useStore from '../../../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';
import ArrowDownIcon from '../../../../common/Icons/ArrowDownIcon';

const FormInputOccupationSelectedValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const handleOnClick = () => {
    const valueSelected = document.getElementsByName(field.name)[0].value;

    const newInformation = {
      ...information,
      [field.name]: valueSelected,
    };

    setInformation(newInformation);

    dispatch({
      type: SET_SHOW_BACKDROP,
      payload: {
        isShow: !backdrop?.isShow,
        current: field.name,
        onClick: () => {
          const newValidation = checkFormInputValidation(
            valueSelected,
            field,
            validation
          );
          setValidation(newValidation);
        },
      },
    });
  };

  return (
    <FormGroupStyled>
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
        onClick={handleOnClick}
        readOnly
      />
      <FormControlFeedback hidden={false} type="invalid">
        {validation[field.name]}
      </FormControlFeedback>
      <ArrowDownIcon
        color="var(--ds-c-grey-dark)"
        size={{ width: 14, height: 10 }}
        styles={{
          position: 'absolute',
          top: '40px',
          right: '16px',
          transform:
            backdrop?.current === field.name &&
            backdrop?.isShow &&
            'rotate(180deg)',
        }}
      />
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  position: relative;
  margin-bottom: 32px;
  position: relative;

  &:last-child {
    margin-bottom: 56px;
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
    background-color: transparent !important;
  }

  &[readonly] {
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
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
  color: var(--ds-c-red);
  position: absolute;
  margin-top: 4px;
`;

export default FormInputOccupationSelectedValidation;
