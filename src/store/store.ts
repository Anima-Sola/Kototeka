import { create } from "zustand";

interface AuthState {
  isSignedIn: boolean;
  userName: string;
  setIsSignedIn: (value: boolean) => void;
  setUserName: (value: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  userName: "",
  setIsSignedIn: (value: boolean) => set({ isSignedIn: value }),
  setUserName: (value: string) => set({ userName: value }),
}));
