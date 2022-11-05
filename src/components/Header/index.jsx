import * as React from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  LOGIN_PREFIX,
  NAV_MENUS,
  PRODUCT_LOGO,
  REGISTER_PREFIX,
} from '../../constants';
import LangDropdown from './components/CustomLangDropdown';
import { useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import ButtonLinkCommon from '../common/ButtonLinkCommon';

const Header = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isLoginButtonActive = pathname.includes('login');
  const isRegisterButtonActive = pathname.includes('register');

  const [currentNav, setCurrentNav] = React.useState(`/${theme}`);

  return (
    <NavbarStyled>
      <NavbarBrand href={`/${theme}`}>
        <img
          src={PRODUCT_LOGO[theme]}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Brand logo"
        />
      </NavbarBrand>
      <NavStyled className="me-auto">
        {NAV_MENUS.map((nav) => (
          <NavLink
            key={nav.href}
            className={currentNav === nav.href && 'active'}
            href={nav.href}
          >
            {nav.icon && (
              <nav.icon
                color="var(--t-c-header-nav-link)"
                size={{ width: 24, height: 24 }}
              />
            )}
            {nav.text || null}
          </NavLink>
        ))}
      </NavStyled>
      <ButtonWrap>
        <ButtonLinkCommon
          href={`/${theme}${LOGIN_PREFIX}`}
          value="Log in"
          styles={{
            marginRight: '16px',
            fontSize: '16px',
            paddingInline: '14.5px',
          }}
          color="var(--ds-c-grey-dark)"
          background={
            isLoginButtonActive ? 'var(--ds-c-yellow)' : 'var(--ds-c-white)'
          }
        />
        <ButtonLinkCommon
          href={`/${theme}${REGISTER_PREFIX}`}
          value="Register"
          styles={{
            marginRight: '40px',
            fontSize: '16px',
            paddingInline: '6.5px',
          }}
          color="var(--ds-c-grey-dark)"
          background={
            isRegisterButtonActive ? 'var(--ds-c-yellow)' : 'var(--ds-c-white)'
          }
        />
        <LangDropdown />
      </ButtonWrap>
    </NavbarStyled>
  );
};

const NavbarStyled = styled(Navbar)`
  padding: 16px 40px;
  background-color: var(--t-bg-header);

  height: 72px;
`;

const NavbarBrand = styled(Navbar.Brand)`
  margin-left: 16.07px;
  margin-right: 0px;

  img {
    width: auto;
    height: 32px;
    margin-right: 150px;
  }
`;

const NavStyled = styled(Nav)`
  height: 72px;
  margin-right: unset;
`;
const NavLink = styled(Nav.Link)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  text-transform: uppercase;
  color: var(--t-c-header-nav-link);

  padding-inline: 27.5px !important;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--ds-c-grey-hover);

    svg {
      path {
        stroke: var(--ds-c-grey-hover);
      }
    }
  }

  &.active {
    border-bottom: 3px solid var(--ds-c-yellow);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
`;

export default Header;
