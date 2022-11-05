import { useEffect } from 'react';

const checkLoadCSSDuplicated = (href) => {
  if (window !== 'undefined') {
    const styleSheets = Array.from(document.head.getElementsByTagName('link'));

    if (styleSheets.length) {
      const styleEleLast = styleSheets.slice(-1)[0];

      return styleEleLast.getAttribute('href') === href;
    }
  }

  return false;
};

const useLoadCSS = (href) => {
  useEffect(() => {
    if (href && !checkLoadCSSDuplicated(href)) {
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = "this.onload=null;this.rel='stylesheet'";

      document.head.appendChild(link);
    }
  }, [href]);
};

export default useLoadCSS;
