import useStore from "../store/store";
import { lightThemeNew, darkThemeNew } from "../constants/colors";

export const useTheme = () => {
  const { mode, resolvedTheme } = useStore();
  const themeKey = mode === "system" ? resolvedTheme : mode;
  const theme = themeKey === "dark" ? darkThemeNew : lightThemeNew;
  return theme;
};
