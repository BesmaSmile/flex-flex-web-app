import { AxiosInstance } from "axios";

const favoriteService = (api: AxiosInstance) => {
  const getFavorites = () => api.get('/favorite')
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const addToFavorites = (article: any) => api.post('/favorite/add', article)
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const removeFromFavorites = (id: number, category: string) => api.post('/favorite/remove', { id, category })
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  return { getFavorites, addToFavorites, removeFromFavorites };
};
export default favoriteService;
