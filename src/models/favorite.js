import messagesHandler from 'messages-handler';
import api from 'services';

const initialState = {
  data: [],
  loading: false,
  error: false,
};
export default {
  namespace: 'favorite',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GET_FAVORITE({ payload }, { put, call }) {
      yield put({
        type: 'setState',
        payload: {
          loading: true,
          error: false,
        },
      });

      try {
        const response = yield call(api.getFavorite, payload);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              data: response.data,
              loading: false,
            },
          });
        }
      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            loading: false,
            error: error.message,
          },
        });
      }
    },
    * ADD_TO_FAVORITE({ payload }, { select, put, call }) {
      const { data } = yield select((state) => state.favorite);
      try {
        const response = yield call(api.addToFavorite, payload);
        if (response.status === 200) {
          messagesHandler.showSuccessMessage('Successfully added to favorite!');
          yield put({
            type: 'setState',
            payload: {
              data: [...data, response.data],
              loading: false,
            },
          });
        }
      } catch (error) {
        messagesHandler.showErrorMessage(error.message);
        yield put({
          type: 'setState',
          payload: {
            loading: false,
          },
        });
      }
    },
    * REMOVE_FROM_FAVORITE({ payload }, { select, put, call }) {
      const { data } = yield select((state) => state.favorite);
      try {
        const response = yield call(api.removeFromFavorite, payload);
        if (response.status === 200) {
          messagesHandler.showSuccessMessage('Successfully removed from favorite!');
          yield put({
            type: 'setState',
            payload: {
              data: data.filter((article) => !(article.id === payload.id
                && article.category === payload.category)),
              loading: false,
            },
          });
        }
      } catch (error) {
        messagesHandler.showErrorMessage(error.message);
        yield put({
          type: 'setState',
          payload: {
            loading: false,
          },
        });
      }
    },
  },
};
