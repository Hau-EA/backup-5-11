import JsCookies from 'js-cookie';

const getSubDomain = () => {
  const host = window.location.hostname;
  if (host.indexOf('local') > -1) {
    return host;
  }
  return `.${host.split('.').slice(-2).join('.')}`;
};

const OPTS = {
  domain: getSubDomain(),
};

const Cookies = {
  set(key, value) {
    return JsCookies.set(key, value, OPTS);
  },
  get(key) {
    return JsCookies.get(key);
  },
  remove(key) {
    return JsCookies.remove(key, OPTS);
  },
  setTheme(key, value) {
    if (window !== 'undefined') {
      document.documentElement.className = value;
    }

    return JsCookies.set(key, value, OPTS);
  },
};

export default Cookies;
