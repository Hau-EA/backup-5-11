import HHMTLogo from '../../assets/images/hhmt-logo.svg';
import REMOXLogo from '../../assets/images/remox-logo.svg';
import HomeIcon from '../../components/common/Icons/HomeIcon';
import Cookies from '../../helpers/cookies';
import { THEME_REDIRECTED } from '../storage';

const themeRedirected = Cookies.get(THEME_REDIRECTED);

export const NAV_MENUS = [
  {
    icon: HomeIcon,
    text: '',
    href: `/${themeRedirected}`,
  },
  {
    icon: null,
    text: 'MONEY EXCHANGE',
    href: `/${themeRedirected}/1`,
  },
  {
    icon: null,
    text: 'FOREIGN EXCHANGE',
    href: `/${themeRedirected}/2`,
  },
  {
    icon: null,
    text: 'FAQS',
    href: `/${themeRedirected}/3`,
  },
  {
    icon: null,
    text: 'CONTACT US',
    href: `/${themeRedirected}/4`,
  },
];

export const PRODUCT_LOGO = {
  hhmt: HHMTLogo,
  remox: REMOXLogo,
};
