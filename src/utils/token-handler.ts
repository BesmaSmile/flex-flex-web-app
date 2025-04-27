import { useStore } from '@/store';

const getToken = () => {
  return useStore.getState().auth.token;
};

export default {
  getToken,
}

