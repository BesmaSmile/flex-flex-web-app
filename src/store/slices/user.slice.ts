import { StateCreator } from "zustand"
import { AppSlice, UserSlice } from "@/store/types"
import api from "@/services/api";
import { LoginType, RegisterType } from "@/types";
import { eventEmitter } from "@/utils";

const initialState = {
  auth: {
    token: null,
    isAuthenticated: false,
  },
  user: {
    data: null,
    loading: false,
    submitting: false,
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
          ...initialState.user,
          submitting: true,
        }
      }));
      try {
        const response = await api.userService.login(payload);
        if (response?.status === 201) {
          set(() => ({
            auth: {
              token: response.data.token,
              isAuthenticated: true,
            },
            user: {
              ...initialState.user,
              data: response.data.user,
              submitting: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          user: {
            ...initialState.user,
            submitting: false,
          }
        }));
        eventEmitter.emit('error', error.message)
      }
    },
    register: async (payload: RegisterType) => {
      set(() => ({
        user: {
          ...initialState.user,
          submitting: true,
        }
      }));
      try {
        const response = await api.userService.register(payload);
        if (response?.status === 201) {
          set(() => ({
            user: {
              ...initialState.user,
              data: response.data,
              submitting: false,
            }
          }));
          eventEmitter.emit('success', "Successfully registered! Please login.")
        }
      } catch (error: any) {
        set(() => ({
          user: {
            ...initialState.user,
            submitting: false,
          }
        }));
        eventEmitter.emit('error', error.message)
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
          ...initialState.user,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.userService.getInfos();
        if (response?.status === 200) {
          set(() => ({
            user: {
              ...initialState.user,
              data: response.data,
              loading: false,
              error: null,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          user: {
            ...initialState.user,
            loading: false,
            error
          }
        }));
      }
    },
  })
