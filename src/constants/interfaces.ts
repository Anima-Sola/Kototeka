import { PetType, favouritePetType } from "./types";

export interface IAuthSlice {
  isSignedIn: boolean | null;
  isAppReady: boolean;
  isFontsLoaded: boolean;
  userName: string;
  userId: string;
  isOnboarding: boolean;
  setIsSignedIn: (value: boolean) => void;
  setIsAppReady: (value: boolean) => void; 
  setIsFontsLoaded: (value: boolean) => void;
  setUserName: (value: string) => void;
  setUserId: (value: string) => void;
  setIsOnBoarding: (value: boolean) => void;
}

export interface IPetsSlice {
  pets: Array<PetType>;
  filterRequestSettings: {
    limit: number;
    has_breeds: boolean;
  };
  isFiltersChanged: boolean;
  setPets: (value: Array<PetType>) => void;
  addPets: (value: Array<PetType>) => void;
  setFilterRequestSettings: (value: { limit: number; has_breeds: boolean }) => void;
  setIsFiltersChanged: (value: boolean) => void;
}

export interface IFavouritePetsSlice {
  favouritePets: Array<favouritePetType>;
  setFavouritePets: (value: Array<favouritePetType>) => void;
  addFavouritePet: (value: favouritePetType) => void;
  deleteFavouritePet: (value: string) => void;
  addFavoritePetBreeds: (id: string, value: any[]) => void;
}

export interface IUploadedPetsSlice {
  uploadedPets: Array<PetType>;
  setUploadedPets: (value: Array<PetType>) => void;
  addUploadedPet: (value: PetType) => void;
  deleteUploadedPet: (value: string) => void;
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

export interface IApiSlice {
  petsType: 'cats' | 'dogs',
  apiKey: string,
  baseUrl: string,
  setApi: (value: 'cats' | 'dogs') => void;
}

export interface ITheme {
  colors: {
    statusBar: string;
    statusBarTransluscent: string;
    main: string;
    mainSplash: string;
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
    blackTransluscent: string;
    whiteTransluscent: string;
    red: string;
    green: string,
    shadow: string;
    uploadPhotoBtn: string;
  };
}
