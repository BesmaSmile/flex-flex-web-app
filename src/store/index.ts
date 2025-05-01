import { create } from 'zustand'
import { createGlobalSlice } from './slices/global.slice';
import { createUserSlice } from './slices/user.slice'
import { AppSlice } from './types';
import { devtools, persist } from 'zustand/middleware';
import { createMoviesSlice } from './slices/movies.slice';
import { createTvShowsSlice } from './slices/tv-shows.slice';
import { createFavoritesSlice } from './slices/favorites.slice';

export const useStore = create<AppSlice>()(
  devtools(persist((...args) => ({
    ...createGlobalSlice(...args),
    ...createUserSlice(...args),
    ...createMoviesSlice(...args),
    ...createTvShowsSlice(...args),
    ...createFavoritesSlice(...args),
  }), {
    name: 'flix-flex-storage',
    partialize: (state) => ({
      auth: state.auth,
      user: { data: state.user?.data },
    }),
    onRehydrateStorage: () => (state) => {
      state?.setHydrated(true);
    },
  }))
);