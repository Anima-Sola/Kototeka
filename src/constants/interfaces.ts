import { CatType } from "./types";

export interface IAuthSlice {
  isSignedIn: boolean;
  userName: string;
  setIsSignedIn: (value: boolean) => void;
  setUserName: (value: string) => void;
}

export interface ICatsSlice {
  cats: Array<CatType>;
  setCats: (value: Array<CatType>) => void;
}

export interface IFavouriteCatsSlice {
  favouriteCats: Array<CatType>;
  setFavouriteCats: (value: Array<CatType>) => void;
}

