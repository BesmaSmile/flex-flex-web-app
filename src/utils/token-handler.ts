import { useStore } from '@/store';

const getToken = () => {
  return useStore.getState().auth.token;
};

const removeToken = () => {
  useStore.setState((state) => ({
    auth: {
      ...state.auth,
      token: null,
      isAuthenticated: false,
    },
  }));
}

const tokenHandler = {
  getToken,
  removeToken
};

export default tokenHandler;

