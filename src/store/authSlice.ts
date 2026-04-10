import { IAuthSlice } from "../constants/interfaces";

export const createAuthSlice = (set: any, get: any, api: any): IAuthSlice => ({
  isSignedIn: null,
  isAppReady: false,
  isFontsLoaded: false,
  userName: "",
  setIsSignedIn: (value: boolean) => set({ isSignedIn: value }),
  setIsAppReady: (value: boolean) => set({ isAppReady: value }),
  setIsFontsLoaded: (value: boolean) => set({ isFontsLoaded: value }),
  setUserName: (value: string) => set({ userName: value }),
});
