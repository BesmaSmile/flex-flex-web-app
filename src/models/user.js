import api from 'services';
import messagesHandler from 'messages-handler';
import { login, isLoggedIn, logout } from 'utils/login';

const initialState = { loading: false, isLoggedIn: isLoggedIn() };
export default {
  namespace: 'user',
  state: initialState,
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
    logout() {
      return { loading: false, isLoggedIn: false };
    },
  },
  effects: {
    * LOGIN({ payload }, { put, call }) {
      yield put({
        type: 'setState',
        payload: {
          loading: true,
        },
      });

      try {
        const response = yield call(api.login, payload);
        if (response.status === 200) {
          messagesHandler.showSuccessMessage('Hi again! Successfuly connected');
          login(response.data.token);
          yield put({
            type: 'setState',
            payload: {
              isLoggedIn: true,
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
    * REGISTER({ payload }, { put, call }) {
      yield put({
        type: 'setState',
        payload: {
          loading: true,
        },
      });

      try {
        const response = yield call(api.register, payload);
        if (response.status === 200) {
          messagesHandler.showSuccessMessage('Welcome to PopCorn ! Successfuly created account');
          login(response.data.token);
          yield put({
            type: 'setState',
            payload: {
              isLoggedIn: true,
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
    * LOGOUT(_, { put }) {
      logout();
      yield put({
        type: 'logout',
      });
    },
    * GET_INFO({ payload }, { put, call }) {
      try {
        const response = yield call(api.getUserInfo, payload);
        if (response.status === 200) {
          yield put({
            type: 'setState',
            payload: {
              data: response.data,
            },
          });
        }
      } catch (error) {
        console.log('error getting user info : ', error);
      }
    },
  },
};
