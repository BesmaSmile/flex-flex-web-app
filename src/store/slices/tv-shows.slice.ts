import { StateCreator } from "zustand"
import { AppSlice, TvShowsSlice } from "@/store/types"
import api from "@/services/api";

const initialState = {
  infimitePopularTvShows: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  popularTvShows: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  topRatedTvShows: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  tvShowDetails: {
    data: {},
    loading: null,
    error: null,
  },
  tvShowsSearchResults: {
    query: '',
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
}
export const createTvShowsSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never]],
  [],
  TvShowsSlice
> =
  (set, get) => ({
    ...initialState,

    getTopRatedTvShows: async (page: number) => {
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
        if (response?.status === 200) {
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
            error: error.message,
          }
        }));
      }
    },
    getPopularTvShows: async (page: number) => {
      const popularTvShows = get().popularTvShows;
      set(() => ({
        popularTvShows: {
          ...popularTvShows,
          loading: true,
        }
      }));
      try {
        const response = await api.tvShowsService.getPopularTvShows(page);
        if (response?.status === 200) {
          set(() => ({
            popularTvShows: {
              loading: false,
              data: response.data.results,
              page,
              totalPages: response.data.total_pages
            },
          }));
        }
      } catch (error: any) {
        set(() => ({
          popularTvShows: {
            ...popularTvShows,
            loading: false,
            error: error.message,
          }
        }));
      }
    },
    loadMorePopularTvShows: async () => {
      const infimitePopularTvShows = get().infimitePopularTvShows;
      const nextPage = infimitePopularTvShows.page + 1;
      set(() => ({
        infimitePopularTvShows: {
          ...infimitePopularTvShows,
          loading: true,
        }
      }));
      try {
        const response = await api.tvShowsService.getPopularTvShows(nextPage);
        if (response?.status === 200) {
          set(() => ({
            infimitePopularTvShows: {
              loading: false,
              data: [
                ...infimitePopularTvShows.data,
                ...response.data.results,
              ],
              page: nextPage,
              totalPages: response.data.total_pages
            },
          }));
        }
      } catch (error: any) {
        set(() => ({
          infimitePopularTvShows: {
            ...infimitePopularTvShows,
            loading: false,
            error: error.message,
          }
        }));
      }
    },
    getTvShowsDetails: async (id: number) => {
      const tvShowDetails = get().tvShowDetails;
      set(() => ({
        tvShowDetails: {
          ...tvShowDetails,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.tvShowsService.getTvShowDetails(id);
        if (response?.status === 200) {
          set(() => ({
            tvShowDetails: {
              ...tvShowDetails,
              data: response.data,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          tvShowDetails: {
            ...tvShowDetails,
            loading: false,
            error: error.message,
          }
        }));
      }
    },
    searchTvShows: async (query: string, forceNewSearch: boolean) => {
      const tvShowsSearchResults = get().tvShowsSearchResults;
      const isNewQuery = tvShowsSearchResults.query !== query || forceNewSearch;
      const page = isNewQuery ? 1 : tvShowsSearchResults.page + 1;


      set(() => ({
        tvShowsSearchResults: {
          ...tvShowsSearchResults,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.tvShowsService.searchTvShows(page, query);
        if (response?.status === 200) {
          set(() => ({
            tvShowsSearchResults: {
              ...tvShowsSearchResults,
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
          tvShowsSearchResults: {
            ...tvShowsSearchResults,
            loading: false,
            error: error.message,
          }
        }));
      }
    },
  })
