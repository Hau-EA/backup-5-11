import React from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { FORGOT_PASSWORD_PREFIX, LOGIN_PREFIX } from '../../../../../constants';
import ButtonLinkCommon from '../../../../common/ButtonLinkCommon';

const AccountExistedInform = () => {
  const theme = useTheme();

  return (
    <AccountLimitedInformStyled>
      <Paragraph>
        Please login if you are an existing customer or click Forgot password to
        proceed with password reset.
      </Paragraph>
      <ForgotPasswordLogin>
        <LinkStyled to={`/${theme}${FORGOT_PASSWORD_PREFIX}`}>
          Forgot password?
        </LinkStyled>
        <ButtonLinkCommon
          href={`/${theme}${LOGIN_PREFIX}`}
          value="Login"
          styles={{
            margin: '0px',
            width: '63px',
            height: '32px',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </ForgotPasswordLogin>
    </AccountLimitedInformStyled>
  );
};

const AccountLimitedInformStyled = styled.div`
  margin-top: 32px;
  padding: 10px 16px;
  width: 100%;
  height: 88px;
  background: var(--ds-c-grey-disabled);
  border-radius: 12px;
`;

const Paragraph = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: var(--ds-c-grey-dark);
  margin-bottom: 8px;
`;

const LinkStyled = styled(Link)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-decoration: none;

  color: var(--ds-c-blue);
  display: block;
  margin-right: 38.5px;

  &:hover {
    color: var(--ds-c-blue-hover) !important;
  }

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const ForgotPasswordLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

export default AccountExistedInform;
