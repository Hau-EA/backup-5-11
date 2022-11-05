import React, { useState } from 'react';
import {
  REGISTER_ADDRESS_POST_CODE_NAME_FIELD,
  REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD,
} from '../../../../../constants';
import CustomAddressPostcodeDropdown from '../CustomAddressPostcodeDropdown';
import CustomAddressStreetTypeDropdown from '../CustomAddressStreetTypeDropdown';
import FormInputValidation from '../FormInputValidation';

const FormInputAddressManuallyValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  streetTypeSuggestion,
  setStreetTypeSuggestion,
  checkFormInputValidation,
}) => {
  if (field.name === REGISTER_ADDRESS_STREET_TYPE_NAME_FIELD) {
    return (
      <CustomAddressStreetTypeDropdown
        field={field}
        information={information}
        setInformation={setInformation}
        validation={validation}
        setValidation={setValidation}
        streetTypeSuggestion={streetTypeSuggestion}
        checkFormInputValidation={checkFormInputValidation}
      />
    );
  }

  if (field.name === REGISTER_ADDRESS_POST_CODE_NAME_FIELD) {
    return (
      <CustomAddressPostcodeDropdown
        field={field}
        information={information}
        setInformation={setInformation}
        validation={validation}
        setValidation={setValidation}
        checkFormInputValidation={checkFormInputValidation}
      />
    );
  }

  return (
    <FormInputValidation
      field={field}
      information={information}
      setInformation={setInformation}
      validation={validation}
      setValidation={setValidation}
      setStreetTypeSuggestion={setStreetTypeSuggestion}
      checkFormInputValidation={checkFormInputValidation}
    />
  );
};

export default FormInputAddressManuallyValidation;
