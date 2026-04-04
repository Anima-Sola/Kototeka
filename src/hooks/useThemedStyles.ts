import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { ITheme } from '../constants/interfaces';

export const useThemedStyles = (stylesFactory: (theme: ITheme) => any) => {
  const theme = useTheme();
  return useMemo(() => stylesFactory(theme), [theme]);
};