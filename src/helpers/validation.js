import {
  ADDRESS_REGEX,
  EMAIL_REGEX,
  MOBILE_PHONE_REGEX,
  NUMBER_REGEX,
  TEXT_ONLY_REGEXT,
} from '../constants';

export const emailValid = (value) => {
  if (value) {
    const found = value.match(EMAIL_REGEX);
    return found ? found[0] : found;
  }

  return false;
};

export const passwordValid = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const mobilePhoneValid = (value) => {
  if (value) {
    const found = value.match(MOBILE_PHONE_REGEX);
    return found ? found[0] : found;
  }

  return false;
};

export const textValid = (value) => {
  if (value) {
    const found = value.match(TEXT_ONLY_REGEXT);
    return found ? found[0] : found;
  }

  return false;
};

export const numberValid = (value) => {
  if (value) {
    const found = value.match(NUMBER_REGEX);
    return found ? found[0] : found;
  }

  return false;
};

export const dobValid = (value) => {
  if (value) {
    return value;
  }

  return false;
};

export const addressValid = (value) => {
  if (value) {
    const found = value.match(ADDRESS_REGEX);
    return found ? found[0] : found;
  }

  return false;
};
