import { AxiosInstance } from "axios";
import { LoginType, RegisterType } from "@/types";


const userService = (api: AxiosInstance) => {

  const login = (data: LoginType) => api.post('auth/login', data)
    .catch((error) => {
      throw String(error.response.data.message);
    });

  const register = (data: RegisterType) => api.post('user/register', data)
    .catch((error) => {
      throw String(error.response.data.message);
    });
  const getInfos = () => api.get('user/me')
    .catch((error) => {
      throw String(error.response.data.message);
    });
  return {
    login,
    register,
    getInfos,
  };
};
export default userService;