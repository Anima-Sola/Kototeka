import { create } from "zustand";
import { persist} from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createPetsSlice } from "./petsSlice";
import { createFavouritePetsSlice } from "./favouritePetsSlice";
import { createUploadedPetsSlice } from "./uploadedPetsSlice";
import { createSettingsSlice } from "./settingsSlice";
import { createToastSlice } from "./toastSlice";
import { createApiSlice } from "./apiSlice";
import { StoreState } from "../constants/types";
import { customStorage } from "./customStorage";

const rootStorageKey = "pawslove-storage";

const useStore = create<StoreState>()(
  persist(
    (set, get, api) => {
      return {
        ...createAuthSlice(set, get, api),
        ...createPetsSlice(set, get, api),
        ...createFavouritePetsSlice(set, get, api),
        ...createUploadedPetsSlice(set, get, api),
        ...createSettingsSlice(set, get, api),
        ...createToastSlice(set, get, api),
        ...createApiSlice(set, get, api),
      };
    },
    {
      name: rootStorageKey,
      version: 1,
      storage: customStorage,
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);

export default useStore;
