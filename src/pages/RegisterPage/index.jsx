import React, { useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import LogInDetailsMobile from '../../components/FormRegister/LogInDetails/mobile';
import PersonalDetailsMobile from '../../components/FormRegister/PersonalDetails/mobile';
import DocumentUploadMobile from '../../components/FormRegister/DocumentUpload/mobile';
import RegistationCompletedMobile from '../../components/FormRegister/RegistrationCompleted/mobile';
import ProcessSteps from '../../components/FormRegister/ProcessSteps';
import StartRegisterMobile from '../../components/FormRegister/StartRegister/mobile';

const RegisterPage = () => {
  const [isStarted, setStarted] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const registerScreentStepReference = {
    0: (
      <LogInDetailsMobile
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    ),
    1: (
      <PersonalDetailsMobile
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setStarted={setStarted}
      />
    ),
    2: (
      <DocumentUploadMobile
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setStarted={setStarted}
      />
    ),
    3: <RegistationCompletedMobile />,
  };

  if (isMobile) {
    return (
      <RegisterPageStyled>
        {!isStarted && <StartRegisterMobile setStarted={setStarted} />}
        {isStarted && (
          <>
            <ProcessSteps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {registerScreentStepReference[currentStep]}
          </>
        )}
      </RegisterPageStyled>
    );
  }
  return (
    <RegisterPageStyled>
      <ProcessSteps />
      {registerScreentStepReference[currentStep]}
    </RegisterPageStyled>
  );
};

const RegisterPageStyled = styled.div`
  padding: 24px;
  padding-top: 96px;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 1024px) {
    padding: 48px 386px 16px 386px;
    display: flex;
  }
`;

export default RegisterPage;
