import { StateCreator } from "zustand"
import { AppSlice, MoviesSlice, UserSlice } from "@/store/types"
import api from "@/services/api";
import { LoginType, RegisterType } from "@/types";

const initialState = {
  infinitePopularMovies: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  upcomingMovies: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  popularMovies: {
    data: [],
    page: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  movieDetails: {
    data: {},
    loading: null,
    error: null,
  },
  moviesSearchResults: {
    query: '',
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
}
export const createMoviesSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never]],
  [],
  MoviesSlice
> =
  (set, get) => ({
    ...initialState,

    getUpcomingMovies: async (page: number) => {
      const upcomingMovies = get().upcomingMovies;

      set(() => ({
        upcomingMovies: {
          ...upcomingMovies,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.moviesService.getUpcomingMovies(page);
        if (response.status === 200) {
          set(() => ({
            upcomingMovies: {
              ...upcomingMovies,
              data: response.data.results,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          upcomingMovies: {
            ...upcomingMovies,
            loading: false,
            error,
          }
        }));
      }
    },
    getPopularMovies: async (page: number) => {
      const popularMovies = get().popularMovies;
      set(() => ({
        popularMovies: {
          ...popularMovies,
          loading: true,
        }
      }));
      try {
        const response = await api.moviesService.getPopularMovies(page);
        if (response.status === 200) {
          set(() => ({
            popularMovies: {
              loading: false,
              data: response.data.results,
              page,
              totalPages: response.data.total_pages
            },
          }));
        }
      } catch (error: any) {
        set(() => ({
          popularMovies: {
            ...popularMovies,
            loading: false,
            error,
          }
        }));
      }
    },
    loadMorePopularMovies: async () => {
      const infinitePopularMovies = get().infinitePopularMovies;
      const nextPage = infinitePopularMovies.page + 1;
      set(() => ({
        infinitePopularMovies: {
          ...infinitePopularMovies,
          loading: true,
        }
      }));
      try {
        const response = await api.moviesService.getPopularMovies(nextPage);
        if (response.status === 200) {
          set(() => ({
            infinitePopularMovies: {
              loading: false,
              data: [
                ...infinitePopularMovies.data,
                ...response.data.results,
              ],
              page: nextPage,
              totalPages: response.data.total_pages
            },
          }));
        }
      } catch (error: any) {
        set(() => ({
          infinitePopularMovies: {
            ...infinitePopularMovies,
            loading: false,
            error,
          }
        }));
      }
    },
    getMovieDetails: async (id: number) => {
      const movieDetails = get().movieDetails;
      set(() => ({
        movieDetails: {
          ...movieDetails,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.moviesService.getMovieDetails(id);
        if (response.status === 200) {
          set(() => ({
            movieDetails: {
              ...movieDetails,
              data: response.data,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          movieDetails: {
            ...movieDetails,
            loading: false,
            error,
          }
        }));
      }
    },
    searchMovies: async (query: string, forceNewSearch: boolean) => {
      const moviesSearchResults = get().moviesSearchResults;
      const isNewQuery = moviesSearchResults.query !== query || forceNewSearch;
      const page = isNewQuery ? 1 : moviesSearchResults.page + 1;


      set(() => ({
        moviesSearchResults: {
          ...moviesSearchResults,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.moviesService.searchMovies(page, query);
        if (response.status === 200) {
          set(() => ({
            moviesSearchResults: {
              ...moviesSearchResults,
              data: response.data.results,
              page,
              query,
              totalPages: response.data.total_pages,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          moviesSearchResults: {
            ...moviesSearchResults,
            loading: false,
            error,
          }
        }));
      }
    },
  })
