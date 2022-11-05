import axios from 'axios';
import newBaseApi from './base';
import newFefxApi from './fefx';

const initApi = () => {
  const base = newBaseApi(
    axios.create({
      baseURL: 'https://api-staging.hhmt.com.au',
    })
  );

  const fefx = newFefxApi(
    axios.create({
      baseURL: 'https://fefx-api-staging.fefx.com.au/api',
    })
  );

  return { ...base, fefx };
};

export const api = initApi();
