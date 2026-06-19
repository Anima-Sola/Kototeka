import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createPetsSlice } from "./petsSlice";
import { createFavouritePetsSlice } from "./favouritePetsSlice";
import { createUploadedPetsSlice } from "./uploadedPetsSlice";
import { createSettingsSlice } from "./settingsSlice";
import { createToastSlice } from "./toastSlice";
import { createApiSlice } from "./apiSlice";
import {
  IAuthSlice,
  IPetsSlice,
  IFavouritePetsSlice,
  IUploadedPetsSlice,
  ISettingsSlice,
  IToastSlice,
  IApiSlice,
} from "../constants/interfaces";

type StoreState = IAuthSlice &
  IPetsSlice &
  IFavouritePetsSlice &
  IUploadedPetsSlice &
  ISettingsSlice &
  IToastSlice &
  IApiSlice;

const useStore = create<StoreState>((set, get, api) => {
  return {
    ...createAuthSlice(set, get, api),
    ...createPetsSlice(set, get, api),
    ...createFavouritePetsSlice(set, get, api),
    ...createUploadedPetsSlice(set, get, api),
    ...createSettingsSlice(set, get, api),
    ...createToastSlice(set, get, api),
    ...createApiSlice(set, get, api),
  };
});

export default useStore;
