const moviesService = (api) => {
  const getPopularMovies = ({ page }) => api.get(`/movies/popular?page=${page}`)
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
  const getUpcomingMovies = ({ page }) => api.get(`/movies/upcoming?page=${page}`)
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
  const getMovieDetails = ({ id }) => api.get(`/movies/${id}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 404:
          throw new Error('Ops! This movie was not found');
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  const searchMovies = ({ query, page }) => api.get(`/movies/search?page=${page}&query=${query}`)
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          throw new Error('Server error. Try again later !');
        default:
          throw new Error('Unknown error. Try again later !');
      }
    });
  return {
    getPopularMovies, getUpcomingMovies, getMovieDetails, searchMovies,
  };
};
export default moviesService;
