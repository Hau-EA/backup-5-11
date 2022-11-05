import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { format } from '@ea-fronts/helpers';
import AUDFlag from '../../../../assets/images/countries/aud-flag.svg';

const CustomYouSendDropdown = ({ amount, onChangeAmount }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <ButtonToggle
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FlagIcon src={AUDFlag} width={24.55} height={16.36} alt="Australia" />
      &nbsp;&nbsp;
      {children}
    </ButtonToggle>
  ));

  return (
    <CountryDropdownStyled>
      <Label>You send</Label>
      <DropdownStyled>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Australia (AUD)
        </Dropdown.Toggle>
        <AmountInput
          value={format.toAmountStr(amount)}
          onChange={onChangeAmount}
        />
        {/* <span>{format.toAmountStr(amount)}</span> */}
      </DropdownStyled>
    </CountryDropdownStyled>
  );
};

const CountryDropdownStyled = styled.div`
  width: 206px;
  float: left;
`;
const DropdownStyled = styled(Dropdown)`
  box-sizing: border-box;
  display: grid;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 20.16px;
  width: 206px;
  height: 92px;
  background: var(--ds-c-white);
  border-top: 1px solid var(--ds-c-grey-disabled);
  border-bottom: 1px solid var(--ds-c-grey-disabled);
  border-left: 1px solid var(--ds-c-grey-disabled);
  border-radius: 8px 0px 0px 8px;
`;
const ButtonToggle = styled.a`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: var(--ds-c-grey-dark);
  text-decoration: none;

  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 8px;
  cursor: default;

  &:hover {
    background: transparent;
    border: none;
    color: var(--ds-c-grey-dark);
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
const Label = styled.p`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: var(--ds-c-grey-dark);

  margin-bottom: 8px;
`;
const AmountInput = styled.input`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: var(--ds-c-grey-dark);

  margin-bottom: 0px;
  width: 100%;
  border: none !important;
  outline: none !important;

  &:focus {
    border: none !important;
    outline: none !important;
  }
  &:focus-visible {
    border: none !important;
    outline: none !important;
  }

  span {
    font-size: 24px;
    margin-bottom: 0px;
  }
`;
const FlagIcon = styled.img`
  width: 24px;
  height: 16px;
  border-radius: 6px;
  object-fit: contain;
`;

export default CustomYouSendDropdown;
