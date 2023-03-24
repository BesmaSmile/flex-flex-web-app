const userService = (api) => {
  const login = ({ username, password }) => api.post('/user/login', { username, password })
    .catch((error) => {
      switch (error.response?.data?.error) {
        case 'incorrect_credentials':
          throw new Error('Username or password incorrect !');
        default:
          throw new Error('Unknown error. Failed to sign in !');
      }
    });
  const register = ({
    firstname, lastname, username, password,
  }) => api.post('/user/register', {
    firstname, lastname, username, password,
  })
    .catch((error) => {
      if (error.response?.data?.errors?.username?.[0] === 'existing_username') {
        throw new Error('Existing user with the same username !');
      } else {
        throw new Error('Unknown error. Failed to sign up !');
      }
    });
  const getUserInfo = () => api.get('/user/info');
  return { login, register, getUserInfo };
};
export default userService;
