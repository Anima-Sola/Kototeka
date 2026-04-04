import useStore from "../store/store";
import { lightTheme, darkTheme } from "../constants/colors";

export const useTheme = () => {
  const { mode, resolvedTheme } = useStore();
  const themeKey = mode === "system" ? resolvedTheme : mode;
  const theme = themeKey === "dark" ? darkTheme : lightTheme;
  return theme;
};
