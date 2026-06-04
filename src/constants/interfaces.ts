import { CatType, favouriteCatType } from "./types";

export interface IAuthSlice {
  isSignedIn: boolean | null;
  isAppReady: boolean;
  isFontsLoaded: boolean;
  userName: string;
  userId: string;
  setIsSignedIn: (value: boolean) => void;
  setIsAppReady: (value: boolean) => void; 
  setIsFontsLoaded: (value: boolean) => void;
  setUserName: (value: string) => void;
  setUserId: (value: string) => void;
}

export interface ICatsSlice {
  cats: Array<CatType>;
  filterRequestSettings: {
    limit: number;
    has_breeds: number;
  };
  isFiltersChanged: boolean;
  setCats: (value: Array<CatType>) => void;
  addCats: (value: Array<CatType>) => void;
  setFilterRequestSettings: (value: { limit: number; has_breeds: number }) => void;
  setIsFiltersChanged: (value: boolean) => void;
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

export interface IToastSlice {
  isSuccessToastVisible: boolean;
  isErrorToastVisible: boolean;
  toastMessage: string;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
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
    green: string,
    shadow: string;
    uploadPhotoBtn: string;
  };
}

