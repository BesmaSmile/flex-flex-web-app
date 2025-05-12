import { errorsHandler } from "@/utils";
import { AxiosInstance } from "axios";

const tvShowsService = (api: AxiosInstance) => {
  const getPopularTvShows = (page: number) => api.get(`/tv-shows/popular?page=${page}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const getTopRatedTvShows = (page: number) => api.get(`/tv-shows/top-rated?page=${page}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  const getTvShowDetails = (id: number) => api.get(`/tv-shows/${id}`)
    .catch((error) => {
      errorsHandler.handleTvShowErrors(error);
    });
  const searchTvShows = (page: number, query: string) => api.get(`/tv-shows/search?page=${page}&query=${query}`)
    .catch((error) => {
      errorsHandler.handleGeneralError(error);
    });
  return {
    getPopularTvShows, getTopRatedTvShows, getTvShowDetails, searchTvShows,
  };
};
export default tvShowsService;
