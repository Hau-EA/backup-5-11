import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { api } from '@ea-fronts/api';
import { COUNTRY_FLAG_REFERENCES } from '../../../../constants';
import { useTodayRate } from '@ea-fronts/hooks';
import useStore from '../../../../hooks/useStore';
import {
  SET_CURRENT_DELIVERY_METHODS,
  SET_CURRENT_RATE,
} from '../../../../store/action';
import { format } from '@ea-fronts/helpers';
import ArrowDownIcon from '../../../common/Icons/ArrowDownIcon';

const initCurrentCountry = {
  id: 'Z604JOEQWMEN7MWR',
  name: 'VIETNAM',
  code: 'VNM',
};

const CustomSendToDropdown = () => {
  const { state, dispatch } = useStore();
  const { currentRate } = state;
  const [countries, setCountries] = useState(null);
  const [countriesFilter, setCountriesFilter] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(initCurrentCountry);
  const [searchValue, setSearchValue] = useState('');

  const { rate } = useTodayRate();

  const fetchDeliveryMethods = async (countryCode) => {
    try {
      const { data } = await api.getDeliveryMethods(countryCode);
      if (data) {
        dispatch({
          type: SET_CURRENT_DELIVERY_METHODS,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchRate = async (countryCode, currencyCode, dmCode) => {
    try {
      const payload = {
        countryCode,
        currencyCode: currencyCode === 'USA' ? 'USD' : currencyCode,
        dmCode,
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

  const fetchCountries = async () => {
    try {
      const { data } = await api.getCountries();

      if (data) {
        setCountries(data);
        setCountriesFilter(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeCountry = async (country) => {
    setCurrentCountry(country);

    await fetchDeliveryMethods(country.code);

    await fetchRate(country.code);
  };

  const handleSearchCountry = (e) => {
    const { value } = e.target;

    setSearchValue(value);

    if (!value) {
      setCountriesFilter(countries);

      return;
    }

    const newCountries = countries.filter(
      (country) => country.name.toLowerCase().includes(value) && country
    );
    setCountriesFilter(newCountries);
  };

  useEffect(() => {
    fetchDeliveryMethods('VNM');
    fetchCountries();
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <ButtonToggle
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FlagIcon
        src={COUNTRY_FLAG_REFERENCES[currentCountry.code]}
        width={24.55}
        height={16.36}
        alt={currentCountry.name}
      />
      &nbsp;&nbsp;
      {children}&nbsp;&nbsp;
      <ArrowDownIcon
        color="var(--ds-c-white)"
        size={{ width: 14, height: 10 }}
      />
    </ButtonToggle>
  ));

  return (
    <CountryDropdownStyled>
      <Label>Send to</Label>
      <DropdownStyled>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {currentCountry.name.toLowerCase()}
        </Dropdown.Toggle>
        <Rate>
          1 AUD =&nbsp;<span>{currentRate || rate}</span>
        </Rate>
        {countriesFilter && (
          <DropdownMenuWrap>
            <FindCountry
              value={searchValue}
              placeholder="Text here"
              onChange={handleSearchCountry}
              autoFocus
            />
            <Divider />
            <DropdownMenu>
              {countriesFilter.map((country) => (
                <DropdownItem
                  key={country.id}
                  eventKey={country.code}
                  onClick={() => handleChangeCountry(country)}
                >
                  <img
                    src={COUNTRY_FLAG_REFERENCES[country.code]}
                    width={24.55}
                    height={16.36}
                    alt={country.name}
                  />
                  &nbsp;&nbsp;
                  {country.name.toLowerCase()}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownMenuWrap>
        )}
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
  background: var(--ds-c-blue);
  border: 1px solid var(--ds-c-blue);
  border-radius: 0px;
`;
const DropdownMenuWrap = styled(Dropdown.Menu)`
  padding: 0;
  border: none;
  box-shadow: none;
  width: 287px;
  max-height: 201px;
  background: transparent;
  inset: 0px auto auto 0px !important;
  transform: translate(20px, 37px) !important;
  padding-right: 5px;
`;
const DropdownMenu = styled(Dropdown.Menu)`
  padding: 0;
  border: none;
  box-shadow: var(--ds-box-shadow-4);
  max-height: 160px;
  border-radius: 0.375rem;
  width: 282px;
  overflow: auto;
  background: var(--ds-c-white);
  inset: unset !important;
  transform: none !important;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--ds-c-grey-hover);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
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
  background: var(--ds-bg);

  a:first-child {
    border-radius: 0.375rem 0.375rem 0 0;
  }

  &:hover {
    background: var(--ds-bg-hover);
  }

  &:active {
    color: var(--ds-c-grey-dark);
  }
`;
const FindCountry = styled.input`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-grey-dark);
  height: 40px;
  border: 1px solid var(--ds-c-grey-disabled);
  border-radius: 12px;
  background: var(--ds-c-white);
  width: 100%;
  height: 40px;
  padding: 10px;

  &:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  &:invalid,
  &:invalid:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background-image: none !important;
  }

  &::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--ds-c-grey-hover);
  }
`;

const ButtonToggle = styled.a`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: var(--ds-c-white);
  text-transform: capitalize;
  text-decoration: none;

  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 8px;
  border-radius: 4px;

  &:hover {
    background: transparent;
    border: none;
    color: var(--ds-c-white);
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
const Rate = styled.p`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: var(--ds-c-sky);

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
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: transparent;
  margin: 0px;
`;

export default CustomSendToDropdown;
