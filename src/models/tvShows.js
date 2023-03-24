import api from 'services';

const initialState = {
  popularTvShows: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 1,
    error: false,
  },
  topRatedTvShows: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 1,
    error: false,
  },
  tvShowsPage: {
    data: [],
    loading: false,
    page: 0,
    totalPages: 0,
    error: false,
  },
  tvShowDetails: {
    data: {},
    loading: null,
    error: false,
  },
  tvShowsSearchResults: {
    query: '',
    data: [],
    loading: null,
    page: 0,
    totalPages: 1,
    error: false,
  },
};

export default {
  namespace: 'tvShows',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GET_POPULAR_TV_SHOWS(_, { select, put, call }) {
      const { popularTvShows } = yield select((state) => state.tvShows);
      const params = {
        page: popularTvShows.page + 1,
      };

      yield put({
        type: 'setState',
        payload: {
          popularTvShows: {
            ...popularTvShows,
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getPopularTvShows, params);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              popularTvShows: {
                loading: false,
                data: [
                  ...popularTvShows.data,
                  ...response.data.results,
                ],
                page: popularTvShows.page + 1,
                totalPages: response.data.total_pages,
              },

            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            popularTvShows: {
              ...popularTvShows,
              loading: false,
              error: true,
            },

          },
        });
      }
    },
    * GET_TOP_RATED_TV_SHOWS(_, { select, put, call }) {
      const { topRatedTvShows } = yield select((state) => state.tvShows);

      yield put({
        type: 'setState',
        payload: {
          topRatedTvShows: {
            ...topRatedTvShows,
            error: false,
            data: [],
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getTopRatedTvShows, { page: 1 });
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              topRatedTvShows: {
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
            topRatedTvShows: {
              ...topRatedTvShows,
              loading: false,
              error: true,
            },

          },
        });
      }
    },
    * GET_POPULAR_TV_SHOWS_PAGE({ payload }, { select, put, call }) {
      const { tvShowsPage } = yield select((state) => state.tvShows);
      const params = {
        page: payload.page,
      };

      yield put({
        type: 'setState',
        payload: {
          tvShowsPage: {
            ...tvShowsPage,
            error: false,
            data: [],
            page: payload.page,
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getPopularTvShows, params);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              tvShowsPage: {
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
            tvShowsPage: {
              ...tvShowsPage,
              page: payload.page,
              data: [],
              error: error.message,
              loading: false,
            },
          },
        });
      }
    },
    * GET_TV_SHOW_DETAILS({ payload }, { put, call }) {
      yield put({
        type: 'setState',
        payload: {
          tvShowDetails: {
            error: false,
            data: {},
            loading: true,
          },

        },
      });

      try {
        const response = yield call(api.getTvShowDetails, payload);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              tvShowDetails: {
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
            tvShowDetails: {
              data: {},
              error: error.message,
              loading: false,
            },
          },
        });
      }
    },
    * SEARCH_TV_SHOWS({ payload }, { select, put, call }) {
      const { tvShowsSearchResults } = yield select((state) => state.tvShows);
      const isNewQuery = tvShowsSearchResults.query !== payload.query || payload.forceNewSearch;
      const query = {
        page: isNewQuery ? 1 : tvShowsSearchResults.page + 1,
        query: payload.query,
      };
      const newState = {
        ...tvShowsSearchResults,
        query: payload.query,
        loading: true,
        data: isNewQuery ? [] : tvShowsSearchResults.data,
      };
      yield put({
        type: 'setState',
        payload: {
          tvShowsSearchResults: newState,

        },
      });

      try {
        const response = yield call(api.searchTvShows, query);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              tvShowsSearchResults: {
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
            tvShowsSearchResults: {
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
