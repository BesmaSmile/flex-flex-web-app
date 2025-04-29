import { StateCreator } from "zustand"
import { AppSlice, FavoritesSlice } from "@/store/types"
import api from "@/services/api";

const initialState = {
  favorites: {
    data: [],
    loading: false,
    error: null,
    success: null,
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
      set(() => ({
        favorites: {
          ...favorites,
          error: null,
          success: null,
        }
      }));

      try {
        const response = await api.favoritesService.addToFavorites(article);
        if (response.status === 200) {
          set(() => ({
            favorites: {
              ...favorites,
              data: [...favorites.data, response.data],
              success: "Successfully added to favorites!"
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          favorites: {
            ...favorites,
            error,
          }
        }));
      }
    },
    removeFromFavorites: async (id: number, category: string) => {
      const favorites = get().favorites;
      set(() => ({
        favorites: {
          ...favorites,
          error: null,
          success: null,
        }
      }));
      try {
        const response = await api.favoritesService.removeFromFavorites(id, category);
        if (response.status === 200) {
          set(() => ({
            favorites: {
              ...favorites,
              data: favorites.data.filter((item) => item.id !== id),
              success: "Successfully removed from favorites!"
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          favorites: {
            ...favorites,
            error,
          }
        }));
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
        if (response.status === 200) {
          set(() => ({
            favorites: {
              ...favorites,
              data: response.data,
              loading: false,
            }
          }));
        }
      } catch (error: any) {
        set(() => ({
          favorites: {
            ...favorites,
            loading: false,
            error,
          }
        }));
      }
    },
  })
