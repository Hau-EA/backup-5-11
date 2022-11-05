import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {
  REGISTER_PERSONAL_DETAILS_ADDRESS_MANUALLY_FIELDS,
  REGISTER_PERSONAL_DETAILS_FIELDS,
} from '../../../../constants';

import useStore from '../../../../hooks/useStore';
import Accordion from 'react-bootstrap/Accordion';
import ArrowDownSVG from '../../../../assets/icons/arrow-down-icon.svg';
import {
  SET_REGISTER_DRIVER_LICENCE_SELECTED,
  SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED,
  SET_REGISTER_INFORMATION,
  SET_SHOW_BACKDROP,
} from '../../../../store/action';
import CancelPopupMobile from '../../CancelPopup/mobile';
import ArrowDownIcon from '../../../common/Icons/ArrowDownIcon';
import ButtonCommon from '../../../common/ButtonCommon';
import FormInputGenderRadio from '../components/FormInputGenderRadio';
import FormInputDatepickerValidation from '../components/FormInputDatepickerValidation';
import FormInputAddressSwitch from '../components/FormInputAddressSwitch';
import FormInputValidation from '../components/FormInputValidation';
import CustomAddressFinderDropdown from '../components/CustomAddressFinderDropdown';
import { resetBackdropStore } from '../../../../constants/common';
import {
  RESET_REGISTER_INFORMATION_STORE,
  REGISTER_STEP_REFERENCE,
  REGISTER_PERSONAL_DETAILS_DOB_FIELD,
  REGISTER_DOB_NAME_FIELD,
  REGISTER_OCCUPATION_NAME_FIELD,
  REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS,
  REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD,
  REGISTER_ADDRESS_FINDER_NAME_FIELD,
  REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD,
  REGISTER_ADDRESS_UNIT_NAME_FIELD,
} from '../../../../constants/form';
import CustomOccupationDropdown from '../components/CustomOccupationDropdown';
import FormInputAddressManuallyValidation from '../components/FormInputAddressManuallyValidation';

const initialFormField = RESET_REGISTER_INFORMATION_STORE.personalDetails;

const PersonalDetailsMobile = ({ currentStep, setCurrentStep, setStarted }) => {
  const { state, dispatch } = useStore();
  const { registerInformation, isRegisterEnterAddressManuallySelected } = state;

  const [information, setInformation] = useState(initialFormField);
  const [validation, setValidation] = useState(initialFormField);
  const [isOpenCancelPopup, setOpenCancelPopup] = useState(false);

  const [streetTypeSuggestion, setStreetTypeSuggestion] = useState(null);

  useEffect(() => {
    const informationStore = registerInformation.personalDetails;
    setInformation(informationStore);
  }, [registerInformation]);

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

    if (name === REGISTER_ADDRESS_UNIT_NAME_FIELD) {
      validation = {
        ...validation,
        [name]: '',
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

  const handleNext = async () => {
    const isAllowSubmit = Object.values(information).every((value) => value);

    if (isAllowSubmit) {
      try {
        dispatch({
          type: SET_REGISTER_INFORMATION,
          payload: { [REGISTER_STEP_REFERENCE[currentStep]]: information },
        });

        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error(error?.message);
      }
    }

    if (!isAllowSubmit) {
      let newValidation = { ...validation };

      REGISTER_PERSONAL_DETAILS_FIELDS.forEach((field) => {
        newValidation = checkFormInputValidation(
          information[field.name],
          field,
          newValidation
        );
      });

      newValidation = checkFormInputValidation(
        information[REGISTER_DOB_NAME_FIELD],
        REGISTER_PERSONAL_DETAILS_DOB_FIELD,
        newValidation
      );

      newValidation = checkFormInputValidation(
        information[REGISTER_OCCUPATION_NAME_FIELD],
        REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS[0],
        newValidation
      );

      if (information[REGISTER_OCCUPATION_NAME_FIELD]) {
        newValidation = checkFormInputValidation(
          information[REGISTER_PREVIOUS_EMPLOYED_NAME_FIELD],
          REGISTER_PERSONAL_DETAILS_OCCUPATION_FIELDS[1],
          newValidation
        );
      }

      newValidation = checkFormInputValidation(
        information[REGISTER_ADDRESS_FINDER_NAME_FIELD],
        REGISTER_PERSONAL_DETAILS_ADDRESS_FINDER_FIELD,
        newValidation
      );

      REGISTER_PERSONAL_DETAILS_ADDRESS_MANUALLY_FIELDS.forEach((field) => {
        if (isRegisterEnterAddressManuallySelected) {
          newValidation = {
            ...newValidation,
            [REGISTER_ADDRESS_FINDER_NAME_FIELD]: '',
          };
        }

        if (field.name === REGISTER_ADDRESS_UNIT_NAME_FIELD) {
          newValidation = {
            ...newValidation,
            [field.name]: '',
          };
        } else {
          newValidation = checkFormInputValidation(
            information[field.name],
            field,
            newValidation
          );
        }
      });

      setValidation(newValidation);
    }
  };

  const handleCancel = () => {
    setOpenCancelPopup(!isOpenCancelPopup);

    setStarted(false);

    setCurrentStep(0);

    const payload = RESET_REGISTER_INFORMATION_STORE;
    dispatch({ type: SET_REGISTER_INFORMATION, payload });

    dispatch({ type: SET_REGISTER_DRIVER_LICENCE_SELECTED, payload: true });

    dispatch({
      type: SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED,
      payload: false,
    });

    dispatch({ type: SET_SHOW_BACKDROP, payload: resetBackdropStore });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <CancelPopupMobile
        isOpen={isOpenCancelPopup}
        onClose={() => setOpenCancelPopup(false)}
        onClick={handleCancel}
      />

      <PersonalDetailsMobileStyled>
        <Title>
          <ArrowDownIcon
            color="var(--ds-c-grey-dark)"
            size={{ width: 14 }}
            styles={{ transform: 'rotate(90deg)', marginRight: '16px' }}
            onClick={handlePrevious}
          />
          Personal details
        </Title>
        <Accordion defaultActiveKey="0">
          <AccordionItem eventKey="0">
            <AccordionHeader>General information</AccordionHeader>
            <AccordionBody>
              {REGISTER_PERSONAL_DETAILS_FIELDS.map((field) => (
                <FormInputValidation
                  key={field.name}
                  field={field}
                  information={information}
                  setInformation={setInformation}
                  validation={validation}
                  setValidation={setValidation}
                  checkFormInputValidation={checkFormInputValidation}
                />
              ))}
              <FormInputGenderRadio
                information={information}
                setInformation={setInformation}
                validation={validation}
                setValidation={setValidation}
              />
              <FormInputDatepickerValidation
                information={information}
                setInformation={setInformation}
                validation={validation}
                setValidation={setValidation}
                checkFormInputValidation={checkFormInputValidation}
              />
              <CustomOccupationDropdown
                information={information}
                setInformation={setInformation}
                validation={validation}
                setValidation={setValidation}
                checkFormInputValidation={checkFormInputValidation}
              />
            </AccordionBody>
          </AccordionItem>
          <Divider />
          <AccordionItem eventKey="1">
            <AccordionHeader>Residential address</AccordionHeader>
            <AccordionBody>
              {!isRegisterEnterAddressManuallySelected && (
                <CustomAddressFinderDropdown
                  information={information}
                  setInformation={setInformation}
                  validation={validation}
                  setValidation={setValidation}
                  checkFormInputValidation={checkFormInputValidation}
                />
              )}
              <FormInputAddressSwitch
                information={information}
                setInformation={setInformation}
              />
              {isRegisterEnterAddressManuallySelected &&
                REGISTER_PERSONAL_DETAILS_ADDRESS_MANUALLY_FIELDS.map(
                  (field) => (
                    <FormInputAddressManuallyValidation
                      key={field.name}
                      field={field}
                      information={information}
                      setInformation={setInformation}
                      validation={validation}
                      setValidation={setValidation}
                      checkFormInputValidation={checkFormInputValidation}
                      streetTypeSuggestion={streetTypeSuggestion}
                      setStreetTypeSuggestion={setStreetTypeSuggestion}
                    />
                  )
                )}
            </AccordionBody>
          </AccordionItem>
        </Accordion>
        <NextWrap>
          <ButtonCommon
            value="Cancel"
            onClick={() => setOpenCancelPopup(true)}
            styles={{
              margin: '0px',
              fontSize: '14px',
              width: '159px',
            }}
            color="var(--ds-c-grey-dark)"
            background="var(--ds-c-white)"
          />
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
      </PersonalDetailsMobileStyled>
    </>
  );
};

const PersonalDetailsMobileStyled = styled(Form)`
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

const AccordionItem = styled(Accordion.Item)`
  border: none;
`;
const AccordionHeader = styled(Accordion.Header)`
  margin-bottom: 27.5px;

  button {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    padding: 0;
    color: var(--ds-c-grey-neutral) !important;
    background-color: var(--ds-c-white) !important;
    box-shadow: none !important;

    &::after,
    &:not(.collapsed)::after {
      background-image: url(${ArrowDownSVG});
      background-position: center;
      background-size: 12px 12px;
    }
  }
`;
const AccordionBody = styled(Accordion.Body)`
  padding: 0 !important;
`;

const NextWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 48px);
  height: 72px;
  background: var(--ds-c-white);
`;

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-top: 0.5px solid var(--ds-c-grey-disabled);
  flex: none;
  flex-grow: 0;
  margin-top: 27.5px;
  margin-bottom: 27.5px;
`;

export default PersonalDetailsMobile;
