import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { lightThemeNew } from '../constants/colors';

export const useThemedStyles = (stylesFactory: (theme: typeof lightThemeNew) => any) => {
  const theme = useTheme();
  return useMemo(() => stylesFactory(theme), [theme]);
};