import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { resetBackdropStore } from '../../../../../constants/common';
import useDebounce from '../../../../../hooks/useDebounce';
import useStore from '../../../../../hooks/useStore';
import { harmony } from '../../../../../libs/harmony';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';
import ArrowDownIcon from '../../../../common/Icons/ArrowDownIcon';

const postcodeFinder = [
  {
    value: '2000',
  },
  {
    value: '2001',
  },
  {
    value: '2002',
  },
  {
    value: '2003',
  },
  {
    value: '2004',
  },
];

const FormInputAddressPostcodeValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  setPostcodeSuggestion,
  checkFormInputValidation,
}) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const debounce = useDebounce(0.5);

  const fetchLookupPostcodeSuggestion = async (value) => {
    harmony.lookupPostcode(value, (data) => {
      setPostcodeSuggestion(data.payload);
    });
  };

  const handleOnChange = (e, field) => {
    const { value } = e.target;
    const valueTrim = value.trim();

    const newInformation = {
      ...information,
      [field.name]: valueTrim,
    };

    if (!valueTrim) {
      setPostcodeSuggestion(null);

      dispatch({
        type: SET_SHOW_BACKDROP,
        payload: resetBackdropStore,
      });
    }

    if (valueTrim) {
      debounce(() => {
        fetchLookupPostcodeSuggestion(valueTrim);

        dispatch({
          type: SET_SHOW_BACKDROP,
          payload: {
            isShow: true,
            current: field.name,
          },
        });
      });
    }

    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      valueTrim,
      field,
      validation
    );
    setValidation(newValidation);

    dispatch({
      type: SET_SHOW_BACKDROP,
      payload: {
        isShow: !backdrop?.isShow,
        current: field.name,
        onClick: () => {
          document.getElementsByName(field.name)[0].value = '';

          const newValidation = checkFormInputValidation(
            valueTrim,
            field,
            validation
          );
          setValidation(newValidation);
        },
      },
    });
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

  const handleOnClick = () => {
    const newInformation = {
      ...information,
      [field.name]: '',
    };

    setInformation(newInformation);

    setPostcodeSuggestion(null);

    dispatch({
      type: SET_SHOW_BACKDROP,
      current: resetBackdropStore.current,
      payload: {
        isShow: false,
        onClick: () => {
          document.getElementsByName(field.name)[0].value = '';

          const newValidation = checkFormInputValidation('', field, validation);
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
        onChange={(e) => handleOnChange(e, field)}
        onBlur={(e) => handleOnBlur(e, field)}
        onClick={handleOnClick}
      />
      <FormControlFeedback hidden={false} type="invalid">
        {validation[field.name]}
      </FormControlFeedback>
      {backdrop.isShow && (
        <ArrowDownIcon
          color="var(--ds-c-grey-dark)"
          size={{ width: 14, height: 10 }}
          styles={{
            position: 'absolute',
            top: '40px',
            right: '16px',
            transform: 'rotate(180deg)',
          }}
        />
      )}
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  position: relative;
  margin-bottom: 32px;
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
  position: absolute;
  margin-top: 4px;
`;

export default FormInputAddressPostcodeValidation;
