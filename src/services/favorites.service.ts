import { AxiosInstance } from "axios";
import { errorsHandler } from "@/utils";


const favoriteService = (api: AxiosInstance) => {
  const getFavorites = () => api.get('/favorite')
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const addToFavorites = (article: any) => api.post('/favorite/add', article)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const removeFromFavorites = (id: number, category: string) => api.post('/favorite/remove', { id, category })
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  return { getFavorites, addToFavorites, removeFromFavorites };
};
export default favoriteService;
