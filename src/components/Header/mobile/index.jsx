import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import {
  LOGIN_PREFIX,
  NAV_MENUS,
  PRODUCT_LOGO,
  REGISTER_PREFIX,
} from '../../../constants';
import HumburgerIcon from '../../../assets/icons/humburger-icon.svg';
import { useLocation } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import ButtonLinkCommon from '../../common/ButtonLinkCommon';

const HeaderMobile = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isLoginButtonActive = pathname.includes('login');
  const isRegisterButtonActive = pathname.includes('register');

  return (
    <NavbarStyled expand="sm">
      <NavbarBrand href={`/${theme}`}>
        <img
          src={PRODUCT_LOGO[theme]}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt={`${theme} logo`}
        />
      </NavbarBrand>
      <ButtonWrap>
        <ButtonLinkCommon
          href={`/${theme}${LOGIN_PREFIX}`}
          value="Log in"
          styles={{
            marginRight: '8px',
            height: '32px',
            paddingInline: '13px',
          }}
          color="var(--ds-c-grey-dark)"
          background={
            isLoginButtonActive ? 'var(--ds-c-yellow)' : 'var(--ds-c-white)'
          }
          isDisabled={false}
        />
        <ButtonLinkCommon
          href={`/${theme}${REGISTER_PREFIX}`}
          value="Register"
          styles={{
            marginRight: '17px',
            height: '32px',
            paddingInline: '6.5px',
          }}
          color="var(--ds-c-grey-dark)"
          background={
            isRegisterButtonActive ? 'var(--ds-c-yellow)' : 'var(--ds-c-white)'
          }
          isDisabled={false}
        />
        <NavbarToggle aria-controls="offcanvasNavbar-expand-sm" />
      </ButtonWrap>
      <Navbar.Offcanvas
        id="offcanvasNavbar-expand-sm"
        aria-labelledby="offcanvasNavbarLabel-expand-sm"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {NAV_MENUS.map((nav) => (
              <Nav.Link key={nav.href} href={nav.href}>
                {nav.text}
              </Nav.Link>
            ))}
            <NavDropdown
              title="Dropdown"
              id="offcanvasNavbarDropdown-expand-sm"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </NavbarStyled>
  );
};

const NavbarStyled = styled(Navbar)`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  margin: 0;
  background: var(--t-bg-header);
  height: 70px;
  padding: 19px 24.05px;
`;

const NavbarBrand = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  margin: 0;

  img {
    width: auto;
    height: 22.5px;
    margin-right: 31.55px;
  }
`;

const NavbarToggle = styled(Navbar.Toggle)`
  padding: 0;
  border: none;

  &:focus {
    border: none;
    box-shadow: none;
  }

  .navbar-toggler-icon {
    background-image: url(${HumburgerIcon});
    border-color: var(--ds-c-white);
    width: 24px;
    opacity: 0.5;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
`;

export default HeaderMobile;
