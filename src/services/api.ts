import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '@/config';
import { tokenHandler } from '@/utils';
import userService from './user.service';
import moviesService from './movies.service';
import tvShowsService from './tv-shows.service';
import favoritesService from './favorites.service';


const create = (baseURL = apiConfig.apiUrl) => {
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  };
  const api: AxiosInstance = axios.create({
    baseURL,
    headers,
  });

  api.interceptors.request.use((confi) => {
    const token = tokenHandler.getToken();
    const conf = confi;
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const loginUrls = /(auth\/)(\/login)/g;

      if (
        error.response.status === 401
        && !originalRequest._retry
        && !loginUrls.test(originalRequest.url)
      ) {
        tokenHandler.removeToken()
      }
      return Promise.reject(error);
    },
  );

  return {
    userService: userService(api),
    moviesService: moviesService(api),
    tvShowsService: tvShowsService(api),
    favoritesService: favoritesService(api),
  };
};

const api = create();

export default api;