import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createCatsSlice } from "./catsSlice";
import { createFavouriteCatsSlice } from "./favouriteCatsSlice";
import { createUploadedCatsSlice } from "./uploadedCatsSlice";
import { createSettingsSlice } from "./settingsSlice";
import {
  IAuthSlice,
  ICatsSlice,
  IFavouriteCatsSlice,
  IUploadedCatsSlice,
  ISettingsSlice,
} from "../constants/interfaces";

type StoreState = IAuthSlice &
  ICatsSlice &
  IFavouriteCatsSlice &
  IUploadedCatsSlice &
  ISettingsSlice;

const useStore = create<StoreState>((set, get, api) => {
  return {
    ...createAuthSlice(set, get, api),
    ...createCatsSlice(set, get, api),
    ...createFavouriteCatsSlice(set, get, api),
    ...createUploadedCatsSlice(set, get, api),
    ...createSettingsSlice(set, get, api),
  };
});

export default useStore;
