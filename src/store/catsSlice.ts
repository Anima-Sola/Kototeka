import { ICatsSlice } from "../constants/interfaces";
import { CatType } from "../constants/types";

export const createCatsSlice = (set: any, get: any, api: any): ICatsSlice => ({
  cats: [],
  setCats: (value: Array<CatType>) => 
    set({
      cats: value,
    }),
});
