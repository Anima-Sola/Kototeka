import { ISettingsSlice } from "../constants/interfaces";

export const createSettingsSlice = (set: any, get: any, api: any): ISettingsSlice => ({
  mode: 'system',
  resolvedTheme: 'dark',
  setMode: (mode) => set({ mode }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
});
