import { AxiosInstance } from "axios";
import { LoginType, RegisterType } from "@/types";
import { errorsHandler } from "@/utils";

const userService = (api: AxiosInstance) => {

  const login = (data: LoginType) => api.post('auth/login', data)
    .catch((error) => {
      errorsHandler.handleUserErrors(error);
    });

  const register = (data: RegisterType) => api.post('user/register', data)
    .catch((error) => {
      errorsHandler.handleUserErrors(error);
    });
  const getInfos = () => api.get('user/me')
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  return {
    login,
    register,
    getInfos,
  };
};
export default userService;