const tvShowsService = (api) => {
  const getPopularTvShows = ({ page }) => api.get(`/tv-shows/popular?page=${page}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 422:
          throw new Error("Ops! You can't retrieve more than 500 pages using themoviedb.");
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const getTopRatedTvShows = ({ page }) => api.get(`/tv-shows/top-rated?page=${page}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 422:
          throw new Error("Ops! You can't retrieve more than 500 pages using themoviedb.");
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const getTvShowDetails = ({ id }) => api.get(`/tv-shows/${id}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 404:
          throw new Error('Ops! This TV Show was not found');
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const searchTvShows = ({ query, page }) => api.get(`/tv-shows/search?page=${page}&query=${query}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  return {
    getPopularTvShows, getTopRatedTvShows, getTvShowDetails, searchTvShows,
  };
};
export default tvShowsService;
