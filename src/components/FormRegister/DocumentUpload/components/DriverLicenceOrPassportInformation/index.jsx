import React from 'react';
import styled from 'styled-components';

const DriverLicenceOrPassportInformation = () => {
  return (
    <Information>
      <InformationLabel>
        Upload your selfie holding Licence or Passport
      </InformationLabel>
      <Label>
        <span>*</span>Using JPG, PNG, PDF
      </Label>
      <Paragraph>
        Please take your selfie holding your ID (Passport or Australian Driver
        Licence only):
      </Paragraph>
      <ParagraphList>
        <li>Hold the same ID you have entered.</li>
        <li>The ID must not cover your face.</li>
        <li>Both the ID and selfie must be clear.</li>
      </ParagraphList>
    </Information>
  );
};

const Information = styled.div`
  margin-top: 28px;
  padding-bottom: 72px;
`;
const InformationLabel = styled.label`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  display: block;
  color: var(--ds-c-grey-dark);
`;

const Paragraph = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: var(--ds-c-grey-dark);
  padding: 0;
  margin: 0;
`;
const ParagraphList = styled.ul`
  padding: 0;
  padding-left: 24px;

  li {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: var(--ds-c-grey-dark);
    padding: 0;
    margin: 0;
    list-style: disc;
  }
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

export default DriverLicenceOrPassportInformation;
