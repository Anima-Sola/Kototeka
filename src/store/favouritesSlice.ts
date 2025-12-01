import { IFavouriteCatsSlice } from "../constants/interfaces";
import { favouriteCatType } from "../constants/types";

export const createFavouriteCatsSlice = (set: any, get: any, api: any): IFavouriteCatsSlice => ({
  favouriteCats: [],
  setFavouriteCats: (value: Array<favouriteCatType>) => 
    set({
      favouriteCats: value,
    }),
});
