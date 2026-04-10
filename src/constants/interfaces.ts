import { CatType, favouriteCatType } from "./types";

export interface IAuthSlice {
  isSignedIn: boolean | null;
  isAppReady: boolean;
  isFontsLoaded: boolean;
  userName: string;
  setIsSignedIn: (value: boolean) => void;
  setIsAppReady: (value: boolean) => void; 
  setIsFontsLoaded: (value: boolean) => void;
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

export interface IUploadedCatsSlice {
  uploadedCats: Array<CatType>;
  setUploadedCats: (value: Array<CatType>) => void;
  addUploadedCat: (value: CatType) => void;
  deleteUploadedCat: (value: string) => void;
}

export interface ISettingsSlice {
  mode: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
}

export interface ITheme {
  colors: {
    statusBar: string;
    statusBarTransluscent: string;
    main: string;
    secondary: string;
    secondaryTransluscent: string;
    mainText: string;
    secondaryText: string;
    border: string;
    accent: string;
    accent2: string;
    error: string;
    placeholder: string;
    disabled: string;
    white: string;
    black: string;
    red: string;
    shadow: string;
    uploadPhotoBtn: string;
  };
}

