import React from 'react';
import styled from 'styled-components';
import AccountIncorrectInform from '../AccountIncorrectInform';

const AccountLimitedInform = () => {
  return (
    <>
      <AccountIncorrectInform />
      <AccountLimitedInformStyled>
        Too many failed attempts, please try again in 24 hours or contact us at
        info@hhmt.com.au, LiveChat or <a href={`tel:0297287928`}>0297287928</a>{' '}
        for further assistance.
      </AccountLimitedInformStyled>
    </>
  );
};

const AccountLimitedInformStyled = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: justify;

  color: var(--ds-c-grey-dark);
  margin-bottom: 16px;
  padding: 10px 16px;
  width: 100%;
  height: 62px;
  background: var(--ds-c-grey-disabled);
  border-radius: 12px;

  a {
    color: var(--ds-c-yellow);
    text-decoration: none;

    &:hover,
    &:active {
      color: var(--ds-c-yellow) !important;
    }
  }
`;

export default AccountLimitedInform;
