import { IFavouriteCatsSlice } from "../constants/interfaces";
import { favouriteCatType } from "../constants/types";

export const createFavouriteCatsSlice = (
  set: any,
  get: any,
  api: any
): IFavouriteCatsSlice => ({
  favouriteCats: [],
  setFavouriteCats: (value: Array<favouriteCatType>) =>
    set({
      favouriteCats: value,
    }),
  addFavouriteCat: (value: favouriteCatType) => {
    set((state: IFavouriteCatsSlice) => ({
      favouriteCats: [value, ...state.favouriteCats],
    }));
  },
  deleteFavouriteCat: (value: string | number) => {
    set((state: IFavouriteCatsSlice) => ({
      favouriteCats: state.favouriteCats.filter((cat) => cat.id !== value),
    }));
  },
  addFavoriteCatBreeds: (id: string, breeds: any) => {
    set((state: IFavouriteCatsSlice) => ({
      favouriteCats: state.favouriteCats.map((cat) =>
        cat.id === id ? { ...cat, breeds } : cat
      ),
    }));
  },
});
