import { useState, useEffect } from 'react';
import { api } from '@ea-fronts/api';
import { format } from '@ea-fronts/helpers';

export function useTodayRate() {
  const [rate, setRate] = useState();

  const fetchRate = async () => {
    const { data } = await api.lookupRate('VNM', 'HOME', 'VND');
    const { rateValue } = data;
    setRate(format.toAmountStr(rateValue));
  };

  useEffect(() => {
    fetchRate();
  }, []);

  return { rate, fetchRate };
}
