import { StateCreator } from "zustand"
import { AppSlice, GlobalSlice } from "@/store/types"

const initialState = {
  hasHydrated: false,
}
export const createGlobalSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never]],
  [],
  GlobalSlice
> =
  (set) => ({
    ...initialState,
    setHydrated: (hasHydrated) => {
      set(() => ({
        hasHydrated,
      }));
    },
  })
