import { IFavouriteCatsSlice } from "../constants/interfaces";
import { CatType } from "../constants/types";

export const createFavouriteCatsSlice = (set: any, get: any, api: any): IFavouriteCatsSlice => ({
  favouriteCats: [],
  setFavouriteCats: (value: Array<CatType>) =>
    set({
      favouriteCats: value,
    }),
});
