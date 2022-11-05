import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import {
  REGISTER_ADDRESS_STREET_NAME_NAME_FIELD,
  REGISTER_ADDRESS_STREET_NO_NAME_FIELD,
  REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD,
  resetBackdropStore,
} from '../../../../../constants';
import useDebounce from '../../../../../hooks/useDebounce';
import useStore from '../../../../../hooks/useStore';
import { harmony } from '../../../../../libs/harmony';
import { SET_SHOW_BACKDROP } from '../../../../../store/action';

const FormInputValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  setStreetTypeSuggestion,
  checkFormInputValidation,
}) => {
  const { dispatch } = useStore();

  const debounce = useDebounce(0.5);

  const addressDecomposition = (address) => {
    const addressPaths = address.split(',');
    const streetType = addressPaths[0].split(' ').slice(-1).join(' ');
    return streetType;
  };

  const fetchLookupAddressSuggestion = async (value, information) => {
    console.log('value:::', value);
    console.log('information:::', information);
    if (value) {
      harmony.lookupAddress(value, (data) => {
        let array = [];

        array = data.payload.map((p) => ({
          fullAddress: p.fullAddress,
          id: p.id,
        }));

        if (array.length) {
          const streetTypes = array.map((address) =>
            addressDecomposition(address.fullAddress)
          );

          const streetTypesUnique = [...new Set(streetTypes)];
          setStreetTypeSuggestion(streetTypesUnique);

          information = {
            ...information,
            [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: streetTypesUnique[0],
          };
          setInformation(information);

          const newValidation = {
            ...validation,
            [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: '',
          };
          setValidation(newValidation);

          dispatch({
            type: SET_SHOW_BACKDROP,
            payload: {
              current: REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD,
            },
          });
        }
      });
    }

    if (!value) {
      setStreetTypeSuggestion(null);

      information = {
        ...information,
        [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: '',
      };
      setInformation(information);

      const newValidation = {
        ...validation,
        [REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD]: '',
      };
      setValidation(newValidation);

      dispatch({
        type: SET_SHOW_BACKDROP,
        payload: {
          current: resetBackdropStore.current,
        },
      });
    }
  };

  const handleOnChange = (e, field) => {
    const { value, name } = e.target;
    console.log('saaaa:::', value);

    let newInformation = {
      ...information,
      [name]: value,
    };

    const streetNoName =
      newInformation[REGISTER_ADDRESS_STREET_NO_NAME_FIELD] &&
      newInformation[REGISTER_ADDRESS_STREET_NAME_NAME_FIELD] &&
      newInformation[REGISTER_ADDRESS_STREET_NO_NAME_FIELD] +
        ' ' +
        newInformation[REGISTER_ADDRESS_STREET_NAME_NAME_FIELD];

    debounce(() => {
      fetchLookupAddressSuggestion(streetNoName, newInformation);
    });

    setInformation(newInformation);

    const newValidation = checkFormInputValidation(
      newInformation[name],
      field,
      validation
    );
    setValidation(newValidation);
  };

  const handleOnBlur = (e, field) => {
    const { name } = e.target;

    const newValidation = checkFormInputValidation(
      information[name],
      field,
      validation
    );
    setValidation(newValidation);
  };

  return (
    <FormGroupStyled>
      <FormLabel>
        {field.label}
        {field.isRequired && <span>*</span>}
      </FormLabel>
      <FormControl
        type={field.type}
        name={field.name}
        defaultValue={information[field.name]}
        placeholder={field.placeholder}
        isInvalid={validation[field.name]}
        onChange={(e) => handleOnChange(e, field)}
        onBlur={(e) => handleOnBlur(e, field)}
        readOnly={field.isReadOnly}
      />
      <FormControlFeedback hidden={false} type="invalid">
        {validation[field.name]}
      </FormControlFeedback>
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 32px;
  position: relative;

  &:last-child {
    padding-bottom: 96px;
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
