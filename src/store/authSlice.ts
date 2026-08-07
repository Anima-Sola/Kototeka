import { IAuthSlice } from "../constants/interfaces";

export const createAuthSlice = (set: any, get: any, api: any): IAuthSlice => ({
  isSignedIn: null,
  isAppReady: false,
  isHydrated: false,
  userName: "",
  userId: "",
  isOnboarding: true,
  setIsSignedIn: (value: boolean) => set({ isSignedIn: value }),
  setIsAppReady: (value: boolean) => set({ isAppReady: value }),
  setIsHydrated: (value: boolean) => set({ isHydrated: value }),
  setUserName: (value: string) => set({ userName: value }),
  setUserId: (value: string) => set({ userId: value }),
  setIsOnBoarding: (value: boolean) => set({ isOnboarding: value }),
});
