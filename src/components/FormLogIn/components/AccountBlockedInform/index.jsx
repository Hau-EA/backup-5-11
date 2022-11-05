import React from 'react';
import styled from 'styled-components';

const AccountBlockedInform = () => {
  return (
    <AccountLockedInformStyled>
      There is an issue with your account, please contact us at
      info@hhmt.com.au, LiveChat or <a href={`tel:0297287928`}>0297287928</a>{' '}
      for further assistance.
    </AccountLockedInformStyled>
  );
};

const AccountLockedInformStyled = styled.div`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: justify;

  color: var(--ds-c-grey-dark);
  margin-top: 32px;
  margin-bottom: 24px;
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

export default AccountBlockedInform;
