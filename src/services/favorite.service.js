const favoriteService = (api) => {
  const getFavorite = () => api.get('/favorite/get_all')
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const addToFavorite = (article) => api.post('/favorite/add', article)
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const removeFromFavorite = ({ id, category }) => api.post('/favorite/remove', { id, category })
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  return { getFavorite, addToFavorite, removeFromFavorite };
};
export default favoriteService;
