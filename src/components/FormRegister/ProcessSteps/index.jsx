import React from 'react';
import styled from 'styled-components';

const REGISTER_STEP_DESCS = [
  'Login details',
  'Personal details',
  'Document upload',
  'Complete',
];

const ProcessSteps = ({ currentStep, setCurrentStep }) => {
  return (
    <ProcessStepsStyled>
      {REGISTER_STEP_DESCS.map((stepDesc, index) => (
        <StepWrap
          key={stepDesc}
          className={
            currentStep === index
              ? 'in-progress'
              : currentStep > index && 'completed'
          }
          onClick={currentStep > index ? () => setCurrentStep(index) : () => {}}
        >
          <StepBar />
          <StepDesc>{stepDesc}</StepDesc>
        </StepWrap>
      ))}
    </ProcessStepsStyled>
  );
};

const ProcessStepsStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StepWrap = styled.div`
  margin-right: 4px;
  width: 25%;
  cursor: pointer;

  &:last-child {
    margin-right: 0px;
  }

  &.in-progress {
    div {
      background: var(--ds-bg-step-disabled);
    }

    p {
      color: var(--ds-c-grey-dark);
    }
  }

  &.completed {
    div {
      background: var(--ds-bg-step-completed);
    }

    p {
      color: var(--ds-c-green);
    }
  }
`;
const StepBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--ds-bg-step);
  border-radius: 10px;
`;
const StepDesc = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: var(--ds-c-grey-disabled);
  margin-top: 8px;
  margin-bottom: 0px;
  width: 100%;
`;

export default ProcessSteps;
