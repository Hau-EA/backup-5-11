import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import { useLocation, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { isMobile } from 'react-device-detect';
import HeaderMobile from '../Header/mobile';
import {
  HHMT_THEME,
  THEME_STYLESHEET_REFERENCE,
  THEME_REDIRECTED,
} from '../../constants';
import useLoadCSS from '../../hooks/useLoadCSS';
import Cookies from '../../helpers/cookies';
import Backdrop from '../common/Backdrop';
import useStore from '../../hooks/useStore';

const pathsHideHeader = [];

const Layout = ({ children, defaultTheme = HHMT_THEME }) => {
  const { state } = useStore();
  const { backdrop } = state;

  const { pathname } = useLocation();
  const isHeaderHidden = pathsHideHeader.includes(pathname);

  const { theme = defaultTheme } = useParams();
  useLoadCSS(THEME_STYLESHEET_REFERENCE[theme]);

  useEffect(() => {
    Cookies.setTheme(THEME_REDIRECTED, theme);
  }, [theme]);

  if (isMobile) {
    return (
      <ContainerStyled>
        {backdrop?.isShow && <Backdrop />}
        {!isHeaderHidden && <HeaderMobile />}
        {children}
      </ContainerStyled>
    );
  }
  return (
    <ContainerStyled>
      {!isHeaderHidden && <Header />}
      {children}
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Container)`
  width: 100%;
  height: 100%;
  margin-inline: auto;
  padding: 0;

  @media screen and (min-width: 1024px) {
    max-width: 1440px;
  }
`;

export default Layout;
