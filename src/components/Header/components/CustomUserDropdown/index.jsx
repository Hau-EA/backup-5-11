import { api } from '@ea-fronts/api';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from '../../../../helpers/cookies';
import { SET_CURRENT_USER } from '../../../../store/action';
import useStore from '../../../../hooks/useStore';
import { ACCESS_TOKEN, LOGIN_PREFIX } from '../../../../constants';

const CustomUserDropdown = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { currentUser } = state;

  const handleLogOut = () => {
    api.logout();

    Cookies.remove(ACCESS_TOKEN);

    dispatch({ type: SET_CURRENT_USER, payload: null });

    navigate(LOGIN_PREFIX);
  };

  return (
    <>
      {currentUser && (
        <DropdownButtonStyled title={`Hi, ${currentUser.firstName}`}>
          <Dropdown.Item as="button" onClick={handleLogOut}>
            LOGOUT
          </Dropdown.Item>
        </DropdownButtonStyled>
      )}
    </>
  );
};

const DropdownButtonStyled = styled(DropdownButton)`
  position: absolute;
  right: 64px;

  button.dropdown-toggle {
    background: var(--ds-bg);
    border: none;

    &:hover {
      background: var(--ds-bg-hover);
      border: none;
    }

    &:focus {
      background: var(--ds-bg-hover);
      border: none;
      outline: none;
      box-shadow: none;
    }

    &:active {
      background: var(--ds-bg-hover);
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
`;

export default CustomUserDropdown;
