import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { format } from '@ea-fronts/helpers';
import { useTodayRate } from '@ea-fronts/hooks';
import { COUNTRY_FLAG_REFERENCES } from '../../../../constants';
import { api } from '@ea-fronts/api';
import useStore from '../../../../hooks/useStore';
import { SET_CURRENT_RATE } from '../../../../store/action';
import ArrowDownIcon from '../../../common/Icons/ArrowDownIcon';

const CustomTheyReceiveDropdown = ({ amount }) => {
  const { rate } = useTodayRate();
  const { state, dispatch } = useStore();
  const { currentDeliveryMethods } = state;
  const [currentUnit, setCurrentUnit] = useState(null);

  useEffect(() => {
    if (currentDeliveryMethods) {
      setCurrentUnit(currentDeliveryMethods[0].code);
    }
  }, [currentDeliveryMethods]);

  const fetchRate = async (currencyCode) => {
    try {
      const payload = {
        countryCode: 'VNM',
        currencyCode,
        dmCode: 'HOME',
      };
      const { data } = await api.lookupRate(
        payload.countryCode,
        payload.dmCode,
        payload.currencyCode
      );
      if (data) {
        dispatch({
          type: SET_CURRENT_RATE,
          payload: format.toAmountStr(data.rateValue),
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeUnit = (unit) => {
    setCurrentUnit(unit);
    fetchRate(unit);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <ButtonToggle
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <ArrowDownIcon
        color="var(--ds-c-grey-neutral)"
        size={{ width: 14, height: 10 }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      {children}&nbsp;&nbsp;
      <FlagIcon
        src={COUNTRY_FLAG_REFERENCES[currentUnit?.currencies?.code]}
        width={24.55}
        height={16.36}
        alt={currentUnit?.currencies?.code}
      />
    </ButtonToggle>
  ));

  return (
    <CountryDropdownStyled>
      <Label>They receive</Label>
      {/* {console.log('currentDeliveryMethods:::', currentDeliveryMethods)} */}
      <DropdownStyled>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {currentUnit}
        </Dropdown.Toggle>
        {rate && (
          <Amount>
            <span>{format.toAmountStr(format.toStrAmount(rate) * amount)}</span>
          </Amount>
        )}
        <DropdownMenu>
          {currentDeliveryMethods?.map((delivery) => (
            <DropdownItem
              key={delivery.code}
              eventKey={delivery.code}
              onClick={() => handleChangeUnit(delivery.code)}
            >
              <img
                src={COUNTRY_FLAG_REFERENCES[delivery.currencies.code]}
                width={24.55}
                height={16.36}
                alt={delivery.currencies.code}
              />
              &nbsp;&nbsp;
              {delivery.currencies.code}
            </DropdownItem>
          ))}
        </DropdownMenu>
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
  border-right: 1px solid var(--ds-c-grey-disabled);
  border-radius: 0px 8px 8px 0px;
`;
const DropdownMenu = styled(Dropdown.Menu)`
  padding: 0;
  border: none;
  box-shadow: var(--ds-box-shadow-4);
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
    border-radius: 0.375rem 0.375rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0.375rem 0.375rem;
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
  color: var(--ds-c-grey-dark);
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 8px;

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
const Amount = styled.p`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: var(--ds-c-grey-dark);

  margin-bottom: 0px;

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

export default CustomTheyReceiveDropdown;
