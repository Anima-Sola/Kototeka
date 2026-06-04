import { ICatsSlice } from "../constants/interfaces";
import { CatType } from "../constants/types";
import { DEFAULT_LIMIT_PHOTOS } from "../constants/common";

export const createCatsSlice = (set: any, get: any, api: any): ICatsSlice => ({
  cats: [],
  filterRequestSettings: {
    limit: DEFAULT_LIMIT_PHOTOS,
    has_breeds: 0,
  },
  isFiltersChanged: false,
  setCats: (value: Array<CatType>) =>
    set({
      cats: value,
    }),
  addCats: (value: Array<CatType>) => {
    const currentCats = get().cats;
    currentCats.push(...value);
    set({
      cats: currentCats,
    });
  },
  setFilterRequestSettings: (value: { limit: number; has_breeds: number }) =>
    set({
      filterRequestSettings: value,
    }),
  setIsFiltersChanged: (value: boolean) =>
    set({
      isFiltersChanged: value,
    }),
});
