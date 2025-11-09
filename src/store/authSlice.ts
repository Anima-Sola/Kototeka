import { IAuthSlice } from "../constants/interfaces";

export const createAuthSlice = (set: any, get: any, api: any): IAuthSlice => ({
  isSignedIn: false,
  userName: "",
  setIsSignedIn: (value: boolean) => set({ isSignedIn: value }),
  setUserName: (value: string) => set({ userName: value }),
});
