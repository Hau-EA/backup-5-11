import React from 'react';
import styled from 'styled-components';
import { resetBackdropStore } from '../../../constants/common';
import useStore from '../../../hooks/useStore';
import { SET_SHOW_BACKDROP } from '../../../store/action';

const Backdrop = ({ styles }) => {
  const { state, dispatch } = useStore();
  const { backdrop } = state;

  const handleOnClick = () => {
    backdrop.onClick();

    dispatch({ type: SET_SHOW_BACKDROP, payload: resetBackdropStore });
  };

  return <BackdropStyled style={{ ...styles }} onClick={handleOnClick} />;
};

const BackdropStyled = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 1;
`;

export default Backdrop;
