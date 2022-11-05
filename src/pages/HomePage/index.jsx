import React from 'react';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import MoneyCalculator from '../../components/MoneyCalculator';
import { useTodayRate } from '@ea-fronts/hooks';

const HomePage = () => {
  const { t } = useTranslation();
  const { rate } = useTodayRate();

  return (
    <HomePageStyled>
      <MoneyCalculator />
      <p>
        {t('content')} (1 AUD / VND): <span>{rate}</span>
      </p>
      <p>
        <Trans i18nKey="desc" />
      </p>
    </HomePageStyled>
  );
};

const HomePageStyled = styled.div``;

export default HomePage;
