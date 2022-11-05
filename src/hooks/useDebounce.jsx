import { useState } from 'react';

const useDebounce = (delaySec) => {
  const [utilStop, setUtilStop] = useState({
    timeOut: 0,
  });

  const debounce = (cb) => {
    if (utilStop.timeOut) {
      clearTimeout(utilStop.timeOut);
    }
    setUtilStop({
      timeOut: setTimeout(() => {
        cb();
        clearTimeout(utilStop.timeOut);
      }, delaySec * 1000),
    });
  };

  return debounce;
};

export default useDebounce;
