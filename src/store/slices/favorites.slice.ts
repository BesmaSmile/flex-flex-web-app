import { StateCreator } from "zustand"
import { AppSlice, FavoritesSlice } from "@/store/types"
import api from "@/services/api";
import { eventEmitter } from "@/utils";

const initialState = {
  favorites: {
    data: [],
    loading: false,
    error: null,
  },

}
export const createFavoritesSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', any]],
  [],
  FavoritesSlice
> =
  (set, get) => ({
    ...initialState,
    addToFavorites: async (article: any) => {
      const favorites = get().favorites;
      try {
        const response = await api.favoritesService.addToFavorites(article);
        if (response?.status === 201) {
          set(() => ({
            favorites: {
              ...favorites,
              data: [...favorites.data, response.data],
            }
          }));
          eventEmitter.emit('success', "Successfully added to favorites!")
        }
      } catch (error: any) {
        eventEmitter.emit('error', error.message)
      }
    },
    removeFromFavorites: async (id: number, category: string) => {
      const favorites = get().favorites;

      try {
        const response = await api.favoritesService.removeFromFavorites(id, category);
        if (response?.status === 201) {
          set(() => ({
            favorites: {
              ...favorites,
              data: favorites.data.filter((item) => item.id !== id),
            }
          }));
          eventEmitter.emit('success', "Successfully removed from favorites!")
        }
      } catch (error: any) {
        eventEmitter.emit('error', error.message)
      }
    },
    getFavorites: async () => {
      const favorites = get().favorites;

      set(() => ({
        favorites: {
          ...favorites,
          loading: true,
          error: null,
        }
      }));
      try {
        const response = await api.favoritesService.getFavorites();
        if (response?.status === 200) {
          set(() => ({
            favorites: {
              ...favorites,
              data: response?.data,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          favorites: {
            ...favorites,
            loading: false,
            error: error.message,
          }
        }));
      }
    },
  })
