import { useStore } from '@/store';

const getToken = () => {
  return useStore.getState().auth.token;
};

const tokenHandler = {
  getToken,
};

export default tokenHandler;

