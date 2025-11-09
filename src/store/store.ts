import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createCatsSlice } from "./catsSlice";
import { createFavouriteCatsSlice } from "./favouritesSlice";
import { IAuthSlice, ICatsSlice, IFavouriteCatsSlice } from "../constants/interfaces";

type StoreState = IAuthSlice & ICatsSlice & IFavouriteCatsSlice;

const useStore = create<StoreState>((set, get, api) => {
  return {
    ...createAuthSlice(set, get, api),
    ...createCatsSlice(set, get, api),
    ...createFavouriteCatsSlice(set, get, api),
  };
});

export default useStore;
