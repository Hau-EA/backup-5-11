import React from 'react';
import styled from 'styled-components';
import FormLogInMobile from '../../components/FormLogIn/mobile';
import { isMobile } from 'react-device-detect';
import LoginBanner from '../../assets/images/login-banner.png';
import FormLogIn from '../../components/FormLogIn';

const LoginPage = () => {
  if (isMobile) {
    return (
      <LoginPageStyled>
        <Title>Hello,</Title>
        <Paragraph>Welcome back!</Paragraph>
        <FormLogInMobile />
      </LoginPageStyled>
    );
  }
  return (
    <LoginPageStyled>
      <FlexboxLeft>
        <img src={LoginBanner} width={627} height={812} alt="" />
        <Introduce>
          <Title>Sending money online - easier, cheaper and faster</Title>
          <SubTitle>
            To Vietnam, Philippines, India, Cambodia and more.
          </SubTitle>
        </Introduce>
      </FlexboxLeft>
      <FlexboxRight>
        <Title>Hello,</Title>
        <Paragraph>Welcome back!</Paragraph>
        <FormLogIn />
      </FlexboxRight>
    </LoginPageStyled>
  );
};

const LoginPageStyled = styled.div`
  padding: 24px;
  padding-top: 94px;

  @media screen and (min-width: 1024px) {
    padding: 0;
    display: flex;
    position: relative;
  }
`;

const FlexboxLeft = styled.div`
  padding-top: 16px;

  img {
    width: 1027px;
    height: 824px;
    object-fit: contain;
  }
`;
const FlexboxRight = styled.div`
  position: absolute;
  left: 852px;
  top: 113px;
  width: 517px;
  height: 638px;
  padding: 40px;
  background: var(--ds-c-white);
  box-shadow: 0px 4px 15px rgb(0 0 0 / 12%);
  border-radius: 40px;
`;

const Title = styled.h1`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 48px;
  text-transform: capitalize;

  color: var(--ds-c-grey-dark);
  margin-bottom: 8px;
`;
const SubTitle = styled.h6`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;

  color: var(--ds-c-grey-dark);
`;
const Paragraph = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);
  margin-bottom: 24px;
`;

const Introduce = styled.div`
  padding: 24px 50px;
  position: absolute;
  width: 609px;
  height: 210px;
  left: 123px;
  bottom: 80px;

  background: rgba(252, 181, 25, 0.8);
  border-radius: 40px;
`;

export default LoginPage;
