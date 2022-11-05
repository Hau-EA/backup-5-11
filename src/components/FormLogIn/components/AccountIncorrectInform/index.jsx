import React from 'react';
import styled from 'styled-components';

const AccountIncorrectInform = () => {
  return (
    <AccountIncorrectInformStyled className="login-incorrect-form">
      *Your email or password may be entered incorrectly.
    </AccountIncorrectInformStyled>
  );
};

const AccountIncorrectInformStyled = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-red);
  margin-top: -24px;
  margin-bottom: 16px;

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

export default AccountIncorrectInform;
