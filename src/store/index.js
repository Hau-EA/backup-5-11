import React, { createContext, useReducer } from 'react';
import { resetBackdropStore } from '../constants/common';
import { RESET_REGISTER_INFORMATION_STORE } from '../constants/form';

import {
  SET_CURRENT_USER,
  SET_CURRENT_RATE,
  SET_CURRENT_DELIVERY_METHODS,
  SET_REGISTER_INFORMATION,
  SET_REGISTER_DRIVER_LICENCE_SELECTED,
  SET_SHOW_BACKDROP,
  SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED,
} from './action';

const initialState = {
  backdrop: resetBackdropStore,
  // currentUser: null,
  currentUser: { firstName: 'HAU' },
  currentRate: null,
  currentDeliveryMethods: null,
  registerInformation: RESET_REGISTER_INFORMATION_STORE,
  isRegisterDriverLicenceSelected: true,
  isRegisterEnterAddressManuallySelected: false,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  let [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_SHOW_BACKDROP:
        return {
          ...state,
          backdrop: {
            ...state.backdrop,
            ...payload,
          },
        };
      case SET_CURRENT_USER:
        return { ...state, currentUser: payload };
      case SET_CURRENT_RATE:
        return { ...state, currentRate: payload };
      case SET_CURRENT_DELIVERY_METHODS:
        return { ...state, currentDeliveryMethods: payload };
      case SET_REGISTER_INFORMATION:
        return {
          ...state,
          registerInformation: { ...state.registerInformation, ...payload },
        };
      case SET_REGISTER_DRIVER_LICENCE_SELECTED:
        return { ...state, isRegisterDriverLicenceSelected: payload };
      case SET_REGISTER_ENTER_ADDRESS_MANUALLY_SELECTED:
        return { ...state, isRegisterEnterAddressManuallySelected: payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
