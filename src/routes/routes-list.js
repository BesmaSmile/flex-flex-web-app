const publicRoutes = {
  login: '/login',
  register: '/register',

};

const protectedRoutes = {
  home: '/home',
  movies: '/movies',
  movie: '/movie/:id',
  tvShows: '/tv-shows',
  tvShow: '/tv-show/:id',
  favorite: '/favorite',
  search: '/search',
};

export default {
  public: publicRoutes,
  protected: protectedRoutes,
};
