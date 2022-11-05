import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import ArrowDownIcon from '../../../common/Icons/ArrowDownIcon';
import useTheme from '../../../../hooks/useTheme';
import { REMOX_THEME } from '../../../../constants';

const langs = {
  en: { nativeName: 'English' },
  vi: { nativeName: 'Vietnamese' },
};

const LangDropdown = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(Object.keys(langs)[0]);

  const theme = useTheme();

  const handleChangeLanguage = (lang) => {
    setCurrentLang(lang);

    i18n.changeLanguage(lang);
  };

  const remainingLanguage = Object.keys(langs).find(
    (lang) => lang !== currentLang
  );

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <ButtonToggle
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}&nbsp;&nbsp;
      <ArrowDownIcon />
    </ButtonToggle>
  ));

  return (
    <LanguageDropdownStyled isHidden={theme === REMOX_THEME}>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {currentLang}
        </Dropdown.Toggle>

        <DropdownMenu>
          <DropdownItem
            eventKey={remainingLanguage}
            onClick={() => handleChangeLanguage(remainingLanguage)}
          >
            {remainingLanguage}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </LanguageDropdownStyled>
  );
};

const LanguageDropdownStyled = styled.div`
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};
  align-items: center;
`;
const DropdownMenu = styled(Dropdown.Menu)`
  padding: 0;
  border: none;
  box-shadow: var(--ds-box-shadow-4);
  height: 40px;
  min-width: 68px;
`;
const DropdownItem = styled(Dropdown.Item)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: var(--ds-c-grey-dark);

  display: flex;
  align-items: center;
  padding: 10px;
  text-transform: capitalize;
  height: 40px;

  &:first-child {
    border-radius: 0.375rem;
  }

  &:hover {
    background: var(--ds-bg-hover);
  }

  &:active {
    color: var(--ds-c-grey-dark);
  }
`;
const ButtonToggle = styled.a`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: var(--ds-c-white);
  text-decoration: none;

  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  text-transform: uppercase;

  &:hover {
    background: transparent;
    border: none;
    color: var(--ds-c-grey-hover);
  }

  &:focus {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
  }

  &:active {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

export default LangDropdown;
