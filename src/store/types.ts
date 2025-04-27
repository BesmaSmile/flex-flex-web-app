import { LoginType, RegisterType } from "@/types";

export type UserSlice = {
  auth: {
    token: string | null,
    isAuthenticated: boolean,
  },
  user: {
    data: any,
    loading: boolean,
    error?: string | null,
  }
  login: (payload: LoginType) => void,
  register: (payload: RegisterType) => void,
  logout: () => void,
  getProfile: () => void,
}

export type PaginatedData = {
  data: any[],
  page: number
  totalPages: number,
  loading: boolean,
  error?: string | null,
}
export type MoviesSlice = {
  upcomingMovies: PaginatedData,
  infinitePopularMovies: PaginatedData,
  popularMovies: PaginatedData,
  movieDetails: {
    data: any,
    loading: boolean | null,
    error?: string | null,
  },
  moviesSearchResults: PaginatedData & { query: string },
  loadMorePopularMovies: () => void,
  getPopularMovies: (page: number) => void,
  getUpcomingMovies: (page: number) => void,
  searchMovies: (query: string, forceNewSearch: boolean) => void,
  getMovieDetails: (id: number) => void,
}

export type FavoritesSlice = {
  favorites: {
    data: any[],
    loading: boolean,
    error?: string | null,
    success?: string | null,
  },
  getFavorites: () => void,
  addToFavorites: (article: any) => void,
  removeFromFavorites: (id: number, category: string) => void,

}

export type TvShowsSlice = {
  infimitePopularTvShows: PaginatedData,
  popularTvShows: PaginatedData,
  topRatedTvShows: PaginatedData,
  tvShowDetails: {
    data: any,
    loading: boolean | null,
    error?: string | null,
  },
  tvShowsSearchResults: PaginatedData & { query: string },
  loadMorePopularTvShows: () => void,
  getPopularTvShows: (page: number) => void,
  getTopRatedTvShows: (page: number) => void,
  searchTvShows: (query: string, forceNewSearch: boolean) => void,
  getTvShowsDetails: (id: number) => void,
}

export type GlobalSlice = {
  hasHydrated: boolean,
  setHydrated: (state: any) => void,
}

export type AppSlice = GlobalSlice & UserSlice & MoviesSlice & TvShowsSlice & FavoritesSlice;