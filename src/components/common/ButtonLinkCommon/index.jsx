import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonLinkCommon = ({
  href = '',
  value = '',
  onClick = () => {},
  color = 'var(--ds-c-grey-dark)',
  background = 'var(--ds-c-white)',
  isDisabled = false,
  styles = {},
}) => {
  const colorDisabled = {
    'var(--ds-c-grey-dark)': 'var(--ds-c-grey-disabled)',
  };

  const colorHover = {
    'var(--ds-c-grey-dark)': 'var(--ds-c-grey)',
  };

  const backgroundHover = {
    'var(--ds-c-yellow)': 'var(--ds-c-yellow-hover)',
  };

  const backgroundDisabled = {
    'var(--ds-c-yellow)': 'var(--ds-c-yellow-disabled)',
  };

  return (
    <ButtonLinkStyled
      to={href}
      onClick={onClick}
      style={{ ...styles }}
      color={color}
      colorHover={colorHover[color]}
      colorDisabled={colorDisabled}
      background={background}
      backgroundHover={backgroundHover[background]}
      backgroundDisabled={backgroundDisabled[background]}
      className={isDisabled && 'disabled'}
    >
      {value}
    </ButtonLinkStyled>
  );
};

const ButtonLinkStyled = styled(Link)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-decoration: none;

  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 40px;
  border-radius: 12px;

  color: ${(props) => props.color};
  background-color: ${(props) => props.background};

  &:focus,
  &:focus-visible,
  &:active {
    color: ${(props) => props.color};
    background: ${(props) => props.background};
  }

  &.disabled {
    color: ${(props) => props.colorDisabled};
    background-color: ${(props) => props.backgroundDisabled};
    cursor: not-allowed;
  }

  @media screen and (min-width: 1024px) {
    font-size: 16px;
    line-height: 19px;

    &:hover {
      border: none;
      outline: none;
      box-shadow: none;
      background-color: ${(props) => props.backgroundHover};
      color: ${(props) => props.colorHover};
    }

    &:disabled {
      &:hover {
        background-color: ${(props) => props.backgroundDisabled};
      }
    }
  }
`;

export default ButtonLinkCommon;
