import { useContext } from 'react';
import { store } from '../store';

const useStore = () => {
  const context = useContext(store);
  const { state, dispatch } = context;

  return { state, dispatch };
};

export default useStore;
