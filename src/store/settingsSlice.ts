import { ISettingsSlice } from "../constants/interfaces";

export const createSettingsSlice = (set: any, get: any, api: any): ISettingsSlice => ({
  mode: 'system',
  resolvedTheme: 'light',
  setMode: (mode) => set({ mode }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
});
