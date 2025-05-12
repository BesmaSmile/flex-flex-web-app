import { errorsHandler } from "@/utils";
import { AxiosInstance } from "axios";

const moviesService = (api: AxiosInstance) => {
  const getPopularMovies = (page: number) => api.get(`/movies/popular?page=${page}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const getUpcomingMovies = (page: number) => api.get(`/movies/upcoming?page=${page}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const getMovieDetails = (id: number) => api.get(`/movies/${id}`)
    .catch((error) => {
      errorsHandler.handleMovieErrors(error);
    });
  const searchMovies = (page: number, query: string) => api.get(`/movies/search?page=${page}&query=${query}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  return {
    getPopularMovies, getUpcomingMovies, getMovieDetails, searchMovies,
  };
};
export default moviesService;