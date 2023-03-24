const tokenName = 'flixflex-token';

export const login = (token) => {
  localStorage.setItem(tokenName, token);
};

export const logout = () => {
  localStorage.removeItem(tokenName);
};

export const getToken = () => localStorage.getItem(tokenName);

export const isLoggedIn = () => !!getToken();
