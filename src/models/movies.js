import api from 'services';

const initialState = {
  popularMovies: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 1,
    error: false,
  },
  upcomingMovies: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 1,
    error: false,
  },
  moviesPage: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 0,
    error: false,
  },
  movieDetails: {
    data: {},
    loading: null,
    error: false,
  },
  moviesSearchResults: {
    query: '',
    data: [],
    loading: null,
    page: 0,
    totalPages: 1,
    error: false,
  },
};

export default {
  namespace: 'movies',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GET_POPULAR_MOVIES(_, { select, put, call }) {
      const { popularMovies } = yield select((state) => state.movies);
      const params = {
        page: popularMovies.page + 1,
      };

      yield put({
        type: 'setState',
        payload: {
          popularMovies: {
            ...popularMovies,
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getPopularMovies, params);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              popularMovies: {
                loading: false,
                data: [
                  ...popularMovies.data,
                  ...response.data.results,
                ],
                page: popularMovies.page + 1,
                totalPages: response.data.total_pages,
              },

            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            popularMovies: {
              ...popularMovies,
              loading: false,
              error: true,
            },

          },
        });
      }
    },
    * GET_UPCOMING_MOVIES(_, { select, put, call }) {
      const { upcomingMovies } = yield select((state) => state.movies);

      yield put({
        type: 'setState',
        payload: {
          upcomingMovies: {
            ...upcomingMovies,
            error: false,
            data: [],
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getUpcomingMovies, { page: 1 });
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              upcomingMovies: {
                loading: false,
                data: response.data.results,
              },

            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            upcomingMovies: {
              ...upcomingMovies,
              loading: false,
              error: true,
            },

          },
        });
      }
    },
    * GET_POPULAR_MOVIES_PAGE({ payload }, { select, put, call }) {
      const { moviesPage } = yield select((state) => state.movies);
      const params = {
        page: payload.page,
      };

      yield put({
        type: 'setState',
        payload: {
          moviesPage: {
            ...moviesPage,
            error: false,
            data: [],
            page: payload.page,
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getPopularMovies, params);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              moviesPage: {
                loading: false,
                data: response.data.results,
                page: payload.page,
                totalPages: response.data.total_pages,
              },
            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            moviesPage: {
              ...moviesPage,
              page: payload.page,
              data: [],
              error: error.message,
              loading: false,
            },
          },
        });
      }
    },
    * GET_MOVIE_DETAILS({ payload }, { put, call }) {
      yield put({
        type: 'setState',
        payload: {
          movieDetails: {
            error: false,
            data: {},
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getMovieDetails, payload);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              movieDetails: {
                loading: false,
                data: response.data,
              },
            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            movieDetails: {
              data: {},
              error: error.message,
              loading: false,
            },
          },
        });
      }
    },
    * SEARCH_MOVIES({ payload }, { select, put, call }) {
      const { moviesSearchResults } = yield select((state) => state.movies);
      const isNewQuery = moviesSearchResults.query !== payload.query || payload.forceNewSearch;
      const query = {
        page: isNewQuery ? 1 : moviesSearchResults.page + 1,
        query: payload.query,
      };
      const newState = {
        ...moviesSearchResults,
        query: payload.query,
        loading: true,
        data: isNewQuery ? [] : moviesSearchResults.data,
      };
      yield put({
        type: 'setState',
        payload: {
          moviesSearchResults: newState,

        },
      });

      try {
        const response = yield call(api.searchMovies, query);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              moviesSearchResults: {
                loading: false,
                data: [
                  ...newState.data,
                  ...response.data.results,
                ],
                page: query.page,
                query: payload.query,
                totalPages: response.data.total_pages,
              },
            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            moviesSearchResults: {
              ...newState,
              loading: false,
              error: 'internal error',
            },
          },
        });
      }
    },
  },
};
