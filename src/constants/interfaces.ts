import { CatType, favouriteCatType } from "./types";

export interface IAuthSlice {
  isSignedIn: boolean;
  userName: string;
  setIsSignedIn: (value: boolean) => void;
  setUserName: (value: string) => void;
}

export interface ICatsSlice {
  cats: Array<CatType>;
  setCats: (value: Array<CatType>) => void;
  addCats: (value: Array<CatType>) => void;
}

export interface IFavouriteCatsSlice {
  favouriteCats: Array<favouriteCatType>;
  setFavouriteCats: (value: Array<favouriteCatType>) => void;
  addFavouriteCat: (value: favouriteCatType) => void;
  deleteFavouriteCat: (value: string) => void;
  addFavoriteCatBreeds: (id: string, value: any[]) => void;
}

