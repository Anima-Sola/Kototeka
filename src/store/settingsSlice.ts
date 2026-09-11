import { ISettingsSlice } from "../constants/interfaces";

export const createSettingsSlice = (
  set: any,
  get: any,
  api: any,
): ISettingsSlice => ({
  mode: "system",
  resolvedTheme: "light",
  numOfColumns: 2,
  setMode: (mode) => set({ mode }),
  setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
  setNumOfColumns: (value) => set({ numOfColumns: value }),
});
