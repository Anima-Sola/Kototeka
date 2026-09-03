import { View, StyleSheet } from "react-native";
import { favouritePetType } from "../constants/types";
import { ITheme } from "../constants/interfaces";
import { useThemedStyles } from "../hooks/useThemedStyles";

export const isElementInArray = (
  element: string,
  array: Array<favouritePetType>,
): favouritePetType | undefined => {
  return array.find((item) => element === item.image.id);
};

export const getBreedIdsStr = (
  selectedBreeds: Record<string, boolean>,
): string => {
  let reqStr = "";
  Object.entries(selectedBreeds).forEach((breed) => {
    if (breed[1]) reqStr = reqStr + breed[0] + ",";
  });

  reqStr = reqStr.substring(0, reqStr.length - 1);

  return reqStr;
};

export const getNumOfSelectedBreedIds = (
  selectedBreeds: Record<string, boolean>,
): number => {
  let num = 0;
  Object.entries(selectedBreeds).forEach((breed) => {
    if (breed[1]) num++;
  });

  return num;
};

export const dots = (currentPage: number) => {
  const styles = useThemedStyles(createStyles);
  const pages = [0, 1, 2, 3, 4, 5, 6];

  return pages.map((page) => {
    if (page === currentPage)
      return <View key={page} style={styles.activeDot} />;

    return <View key={page} style={styles.dot} />;
  });
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    dot: {
      width: 20,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.disabled,
      marginHorizontal: 4,
    },
    activeDot: {
      width: 22,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.accent3,
      marginHorizontal: 4,
    },
  });
