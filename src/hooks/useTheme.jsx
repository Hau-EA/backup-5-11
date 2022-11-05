import { useEffect, useState } from 'react';
import { THEME_REDIRECTED } from '../constants';
import Cookies from '../helpers/cookies';

const useTheme = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const themeRedirected = Cookies.get(THEME_REDIRECTED);

    setTheme(themeRedirected);
  }, []);

  return theme;
};

export default useTheme;
