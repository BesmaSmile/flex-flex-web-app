import axios from 'axios';
import { apiConfig } from 'config';
import { getToken } from 'utils/login';
import favoriteService from './favorite.service';
import moviesService from './movies.service';
import tvShowsService from './tvShows.service';
import userService from './user.service';

const create = (baseURL = apiConfig.apiUrl) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const api = axios.create({
    baseURL,
    headers,
  });
  api.interceptors.request.use(async (confi) => {
    const token = await getToken();
    const conf = confi;
    conf.headers.Authorization = token;
    return conf;
  });

  return {
    ...favoriteService(api),
    ...moviesService(api),
    ...userService(api),
    ...tvShowsService(api),
  };
};

const api = { create };

export default api;
