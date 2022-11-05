import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomSendToDropdown from './components/CustomSendToDropdown';
import CustomTheyReceiveDropdown from './components/CustomTheyReceiveDropdown';
import CustomYouSendDropdown from './components/CustomYouSendDropdown';
import DoubleArrowIcon from '../../assets/icons/double-arrow-icon.svg';
import NotifyIcon from '../../assets/icons/notify-icon.svg';
import ButtonCommon from '../common/ButtonCommon';
import { api } from '@ea-fronts/api';
import { format } from '@ea-fronts/helpers';
import useDebounce from '../../hooks/useDebounce';
import HomeBanner from '../../assets/images/home-banner.png';

const MoneyCalculator = () => {
  const debounce = useDebounce(1);
  const [sendAmount, setSendAmount] = useState(1000);
  const [feeAmount, setFeeAmount] = useState(0);
  const [originFeeAmount, setOriginFeeAmount] = useState(0);

  const fetchLookupFee = async (amount) => {
    const payload = {
      countryCode: 'VNM',
      dmCode: 'BANK',
      amount: amount,
      currencyCode: 'AUD',
    };
    try {
      const { data } = await api.lookupFee(
        payload['countryCode'],
        payload['dmCode'],
        payload['amount'],
        payload['currencyCode']
      );

      if (data) {
        setFeeAmount(data.feeAmount);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLookupOriginFee = async (amount) => {
    const payload = {
      countryCode: 'VNM',
      dmCode: 'BANK',
      amount: amount,
      currencyCode: 'AUD',
    };
    try {
      const { data } = await api.lookupOriginalFee(
        payload['countryCode'],
        payload['dmCode'],
        payload['amount'],
        payload['currencyCode']
      );

      if (data) {
        setOriginFeeAmount(data.feeAmount);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchLookupFee(sendAmount);
    fetchLookupOriginFee(sendAmount);
  }, []);

  const handleOnChangeYouSendAmount = (e) => {
    const { value } = e.target;

    if (!value) {
      setSendAmount(0);
      setFeeAmount(0);

      return;
    }

    setSendAmount(parseInt(format.toStrAmount(value)));

    debounce(() => {
      fetchLookupFee(parseInt(format.toStrAmount(value)));
      fetchLookupOriginFee(parseInt(format.toStrAmount(value)));
    });
  };

  return (
    <MoneyCalculatorStyled>
      <Introduce>
        <IntroduceTitle>
          Send money to Vietnam and many countries
        </IntroduceTitle>
        <DiscountCheckFee>
          <DiscountText>
            Up to 80% discount on the fee when sending money online to Vietnam*.
          </DiscountText>
          <CheckFee>
            <a href="/">
              Check available delivery areas
              <img src={DoubleArrowIcon} alt="double-arrow-icon" />
            </a>
            <a href="/">
              Fees and discounts
              <img src={DoubleArrowIcon} alt="double-arrow-icon" />
            </a>
          </CheckFee>
        </DiscountCheckFee>
      </Introduce>
      <SendMoneyBody>
        <SendReceive>
          <CustomYouSendDropdown
            amount={sendAmount}
            handleOnChangeYouSendAmount={handleOnChangeYouSendAmount}
          />
          <CustomSendToDropdown />
          <CustomTheyReceiveDropdown amount={sendAmount} />
        </SendReceive>
        <TranferFeePay>
          <TranferFee>
            <label>Transfer fee</label>
            <span>{feeAmount} AUD</span>
          </TranferFee>
          <DiscountWrap>
            <label>
              Discount&nbsp;
              <img src={NotifyIcon} alt="double-arrow-icon" />
            </label>
            <div>
              <DiscountPercent>
                {100 - (feeAmount / originFeeAmount) * 100}%
              </DiscountPercent>
              &nbsp;
              <DiscountAmount>({originFeeAmount} AUD)</DiscountAmount>
            </div>
          </DiscountWrap>
          <Divider />
          <TotalPay>
            <label>Total to Pay</label>
            <span>{(sendAmount + feeAmount).toFixed(2)} AUD</span>
          </TotalPay>
          <ButtonCommon
            value="Transfer now"
            color="var(--ds-c-grey-dark)"
            onClick={() => {}}
            styles={{
              width: '100%',
              background: 'var(--ds-c-yellow)',
              marginTop: '24px',
            }}
          />
        </TranferFeePay>
      </SendMoneyBody>
    </MoneyCalculatorStyled>
  );
};

const MoneyCalculatorStyled = styled.div`
  height: 628px;
  background-image: url(${HomeBanner});
  background-size: cover;
  background-position: center;
  padding-top: 128px;
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 36.5px;
  width: 666px;
  height: 184px;
  background: rgba(7, 35, 61, 0.8);
  border-radius: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 40px;
  margin-inline: auto;
`;
const IntroduceTitle = styled.h1`
  font-family: 'Lato';
  line-height: 1;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  text-align: center;
  text-transform: capitalize;
  color: var(--ds-c-white);

  margin-bottom: 10px;
`;
const DiscountCheckFee = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DiscountText = styled.p`
  font-family: 'Lato';
  line-height: 19px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: var(--ds-c-white);

  width: 319px;
  margin-bottom: 0px;
  margin-right: 16px;
  padding-right: 60px;
`;
const CheckFee = styled.div`
  width: fit-content;

  a {
    font-family: 'Lato';
    line-height: 1;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: var(--ds-c-yellow);
    text-decoration: none;

    display: block;

    &:hover {
      color: var(--ds-c-yellow-hover);
    }

    &:active {
      color: var(--ds-c-yellow);
    }

    img {
    }
  }

  a:first-child {
    margin-bottom: 8px;
  }
`;

const SendMoneyBody = styled.div`
  width: 666.18px;
  height: 366px;
  background: var(--ds-c-white);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 24px;
  margin-inline: auto;
`;
const SendReceive = styled.div`
  display: flex;
  margin-bottom: 32px;
`;
const TranferFeePay = styled.div`
  width: 332px;
  margin-inline: auto;
`;
const TranferFee = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: 8px;

  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;

    color: var(--ds-c-grey-dark);
  }

  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: right;
    color: var(--ds-c-grey-dark);
  }
`;
const DiscountWrap = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1;

  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: var(--ds-c-grey-neutral);

    align-items: center;
    display: flex;
  }

  div {
    display: flex;
    align-items: center;
  }
`;
const DiscountPercent = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: var(--ds-c-white);
  text-decoration-line: none;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  width: 40px;
  height: 18px;
  background: #00c27c;
  border-radius: 2px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-right: 8px;
`;
const DiscountAmount = styled.span`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: right;
  text-decoration-line: line-through;
  color: var(--ds-c-grey-hover);
`;
const Divider = styled.div`
  width: 332px;
  height: 0px;
  border-top: 0.5px solid var(--ds-c-grey-disabled);
  flex: none;
  flex-grow: 0;
  margin-top: 16px;
  margin-bottom: 16px;
`;
const TotalPay = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1;

  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    color: var(--ds-c-blue);
  }

  span {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    text-align: right;
    color: var(--ds-c-blue);
  }
`;

export default MoneyCalculator;
