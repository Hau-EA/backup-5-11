import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from '../../helpers/cookies';
import {
  ACCESS_TOKEN,
  THEME_STYLESHEET_REFERENCE,
  THEME_REDIRECTED,
} from '../../constants';
import { api } from '@ea-fronts/api';
import { LOGIN_PREFIX } from '../../constants/router';
import { SET_CURRENT_USER } from '../../store/action';
import useStore from '../../hooks/useStore';
import useLoadCSS from '../../hooks/useLoadCSS';

const PersistLogIn = () => {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const { theme } = useParams();

  useLoadCSS(THEME_STYLESHEET_REFERENCE[theme]);

  const accessToken = Cookies.get(ACCESS_TOKEN);

  useEffect(() => {
    Cookies.setTheme(THEME_REDIRECTED, theme);
  }, [theme]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await api.getProfile(accessToken);

        if (data) {
          const authUser = {
            ...data,
            token: accessToken,
          };
          dispatch({ type: SET_CURRENT_USER, payload: authUser });

          navigate('/' + theme);
        }
      } catch (error) {
        console.error(error.message);

        navigate(`/${theme}${LOGIN_PREFIX}`);
      }
    }

    if (accessToken) {
      fetchProfile();
    }

    if (!accessToken) {
      navigate(`/${theme}${LOGIN_PREFIX}`);
    }
  }, [accessToken, dispatch, navigate, theme]);

  return <>{<Outlet />}</>;
};

export default PersistLogIn;
