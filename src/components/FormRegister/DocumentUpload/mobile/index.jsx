import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {
  REGISTER_DOCUMENT_UPLOAD_DRIVER_LICENCE_FIELDS,
  REGISTER_DOCUMENT_UPLOAD_PASSPORT_FIELD,
  REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD,
  REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD,
  REGISTER_PASSPORT_NAME_FIELD,
} from '../../../../constants';
import useStore from '../../../../hooks/useStore';
import CancelPopupMobile from '../../CancelPopup/mobile';
import {
  SET_REGISTER_DRIVER_LICENCE_SELECTED,
  SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED,
  SET_REGISTER_INFORMATION,
  SET_SHOW_BACKDROP,
} from '../../../../store/action';
import ArrowDownIcon from '../../../common/Icons/ArrowDownIcon';
import ButtonCommon from '../../../common/ButtonCommon';
import { resetBackdropStore } from '../../../../constants/common';
import {
  RESET_REGISTER_INFORMATION_STORE,
  REGISTER_STEP_REFERENCE,
} from '../../../../constants/form';
import FormInputDocumentUploadSwitch from '../components/FormInputDocumentUploadSwitch';
import DriverLicenceOrPassportInformation from '../components/DriverLicenceOrPassportInformation';
import FormInputFileUploadValidation from '../components/FormInputFileUploadValidation';

const initialFields = RESET_REGISTER_INFORMATION_STORE.documentUpload;

const DocumentUploadMobile = ({ currentStep, setCurrentStep, setStarted }) => {
  const { state, dispatch } = useStore();
  const { registerInformation, isRegisterDriverLicenceSelected } = state;

  const [information, setInformation] = useState(initialFields);
  const [validation, setValidation] = useState(initialFields);
  const [isDisabledNext, setDisabledNext] = useState(true);
  const [isOpenCancelPopup, setOpenCancelPopup] = useState(false);

  const informationFilter = (information) => {
    const informationFilter = [];

    Object.keys(information).forEach((key) => {
      informationFilter.push(information[key]);
    });

    return informationFilter;
  };

  const validationFilter = (validation) => {
    const validationFilter = [];

    Object.keys(validation).forEach((key) => {
      validationFilter.push(validation[key]);
    });

    return validationFilter;
  };

  useEffect(() => {
    const informationStore = registerInformation.documentUpload;
    setInformation(informationStore);

    const informationStoreFilter = informationFilter(informationStore);

    const disabledNext = informationStoreFilter.every((value) => !value);

    setDisabledNext(disabledNext);
  }, [registerInformation]);

  const handleDisallowNextStep = (information, validation) => {
    const validationFiltered = validationFilter(validation);

    let isDisallowNextStep = true;
    if (isRegisterDriverLicenceSelected) {
      isDisallowNextStep =
        validationFiltered.some((value) => value) ||
        informationFilter({
          [REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD]:
            information[REGISTER_DRIVER_LICENCE_FRONT_NAME_FIELD],
          [REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD]:
            information[REGISTER_DRIVER_LICENCE_BACK_NAME_FIELD],
        }).some((value) => !value);
    } else {
      isDisallowNextStep =
        validationFiltered.some((value) => value) ||
        informationFilter({
          [REGISTER_PASSPORT_NAME_FIELD]:
            information[REGISTER_PASSPORT_NAME_FIELD],
        }).some((value) => !value);
    }

    setDisabledNext(isDisallowNextStep);
  };

  const handleNext = () => {
    try {
      dispatch({
        type: SET_REGISTER_INFORMATION,
        payload: { [REGISTER_STEP_REFERENCE[currentStep]]: information },
      });

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error(error.message);
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

      <DocumentUploadMobileStyled>
        <Title>
          <ArrowDownIcon
            color="var(--ds-c-grey-dark)"
            size={{ width: 14 }}
            styles={{ transform: 'rotate(90deg)', marginRight: '16px' }}
            onClick={handlePrevious}
          />
          Document upload
        </Title>
        <FormInputDocumentUploadSwitch
          information={information}
          setInformation={setInformation}
          validation={validation}
          handleDisallowNextStep={handleDisallowNextStep}
        />
        <Label>
          <span>*</span>Using JPG, PNG, PDF
        </Label>
        {isRegisterDriverLicenceSelected &&
          REGISTER_DOCUMENT_UPLOAD_DRIVER_LICENCE_FIELDS.map((field) => (
            <FormInputFileUploadValidation
              key={field.name}
              field={field}
              information={information}
              setInformation={setInformation}
              validation={validation}
              setValidation={setValidation}
              handleDisallowNextStep={handleDisallowNextStep}
            />
          ))}
        {!isRegisterDriverLicenceSelected && (
          <FormInputFileUploadValidation
            field={REGISTER_DOCUMENT_UPLOAD_PASSPORT_FIELD}
            information={information}
            setInformation={setInformation}
            validation={validation}
            setValidation={setValidation}
            handleDisallowNextStep={handleDisallowNextStep}
          />
        )}
        <DriverLicenceOrPassportInformation />
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
            isDisabled={isDisabledNext}
          />
        </NextWrap>
      </DocumentUploadMobileStyled>
    </>
  );
};

const DocumentUploadMobileStyled = styled(Form)`
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
const Label = styled.label`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--ds-c-grey-dark);
  padding: 0;
  margin: 0;

  span {
    color: var(--ds-c-yellow);
  }
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

export default DocumentUploadMobile;
