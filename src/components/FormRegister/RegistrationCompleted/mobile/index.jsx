import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import ButtonLinkCommon from '../../../common/ButtonLinkCommon';
import useTheme from '../../../../hooks/useTheme';

const RegistationCompletedMobile = () => {
  const theme = useTheme();

  return (
    <RegistationCompletedMobileStyled>
      <Title>Registration completed successfully!</Title>
      <ThankYouContent>
        <p>
          Thank you for registering. We will review your submitted information
          and be in touch with you shortly.
        </p>
        <p>
          Please check your email and use the enclosed link to finish
          registration. If you need help, please <a href="/">contact</a> us for
          assistance.
        </p>
        <ButtonLinkCommon
          href={`/${theme}`}
          value="Back to homepage"
          styles={{
            fontSize: '16px',
            width: '200px',
            marginInline: 'auto',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </ThankYouContent>
    </RegistationCompletedMobileStyled>
  );
};

const RegistationCompletedMobileStyled = styled(Form)`
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

const ThankYouContent = styled.div`
  width: 100%;
  height: 231px;
  background: #f6f7f8;
  border-radius: 12px;
  padding: 24px;

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: var(--ds-c-grey-dark);
    margin-bottom: 24px;

    &:first-child {
      margin-bottom: 16px;
    }

    a {
      color: var(--ds-c-blue);
      text-decoration: none;

      &:hover {
        color: var(--ds-c-blue) !important;
      }
    }
  }
`;

export default RegistationCompletedMobile;
