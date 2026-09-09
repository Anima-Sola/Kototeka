import { IAuthSlice } from "../constants/interfaces";

export const createAuthSlice = (set: any, get: any, api: any): IAuthSlice => ({
  isSignedIn: null,
  isAppReady: false,
  isHydrated: false,
  userName: "",
  userId: "",
  isOnboarding: true,
  provider: "",
  setIsSignedIn: (value) => set({ isSignedIn: value }),
  setIsAppReady: (value) => set({ isAppReady: value }),
  setIsHydrated: (value) => set({ isHydrated: value }),
  setUserName: (value) => set({ userName: value }),
  setUserId: (value) => set({ userId: value }),
  setIsOnBoarding: (value) => set({ isOnboarding: value }),
  setProvider: (value) => set({ provider: value }),
});
