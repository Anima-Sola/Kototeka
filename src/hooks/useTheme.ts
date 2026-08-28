import useStore from "../store/store";
import { lightTheme, darkTheme } from "../constants/colors";

export const useTheme = () => {
  const mode = useStore((state) => state.mode);
  const resolvedTheme = useStore((state) => state.resolvedTheme);
  const themeKey = mode === "system" ? resolvedTheme : mode;
  const theme = themeKey === "dark" ? darkTheme : lightTheme;
  return theme;
};
