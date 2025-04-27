import { AxiosInstance } from "axios";

const moviesService = (api: AxiosInstance) => {
  const getPopularMovies = (page: number) => api.get(`/movies/popular?page=${page}`)
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
  const getUpcomingMovies = (page: number) => api.get(`/movies/upcoming?page=${page}`)
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
  const getMovieDetails = (id: number) => api.get(`/movies/${id}`)
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
  const searchMovies = (page: number, query: string) => api.get(`/movies/search?page=${page}&query=${query}`)
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