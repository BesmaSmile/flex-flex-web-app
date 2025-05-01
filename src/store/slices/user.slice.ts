import { StateCreator } from "zustand"
import { AppSlice, UserSlice } from "@/store/types"
import api from "@/services/api";
import { LoginType, RegisterType } from "@/types";

const initialState = {
  auth: {
    token: null,
    isAuthenticated: false,
  },
  user: {
    data: null,
    loading: false,
    error: null,
  }
}
export const createUserSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', any]],
  [],
  UserSlice
> =
  (set) => ({
    ...initialState,
    login: async (payload: LoginType) => {
      set(() => ({
        user: {
          data: initialState.user.data,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.userService.login(payload);
        if (response.status === 200) {
          set(() => ({
            auth: {
              token: response.data.token,
              isAuthenticated: true,
            },
            user: {
              data: response.data.user,
              loading: false,
              error: null,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          user: {
            data: initialState.user.data,
            loading: false,
            error,
          }
        }));
      }
    },
    register: async (payload: RegisterType) => {
      set(() => ({
        user: {
          data: initialState.user.data,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.userService.register(payload);
        if (response.status === 200) {
          set(() => ({
            user: {
              data: response.data,
              loading: false,
              error: null,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          user: {
            data: initialState.user.data,
            loading: false,
            error,
          }
        }));
      }
    },
    logout: async () => {
      set(() => ({
        ...initialState,
      }));
    },
    getProfile: async () => {
      set(() => ({
        user: {
          data: initialState.user.data,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.userService.getInfos();
        if (response.status === 200) {
          set(() => ({
            user: {
              data: response.data,
              loading: false,
              error: null,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          user: {
            data: initialState.user.data,
            loading: false,
            error,
          }
        }));
      }
    },
  })
