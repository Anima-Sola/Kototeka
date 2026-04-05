import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

interface RatingRectsProps {
  value: number;
  size?: number;
}

const RatingRects: React.FC<RatingRectsProps> = ({ value, size = 25 }) => {
  const styles = useThemedStyles(createStyles);

  const rects = Array.from({ length: 5 }, (_, index) => {
    const isActive = index < value;

    return (
      <View
        key={index}
        style={[
          styles.rect,
          {
            width: size,
            height: size,
            backgroundColor: isActive
              ? styles.activeRectColor.color
              : styles.inactiveRectColor.color,
            marginRight: index < 4 ? 4 : 0,
          },
        ]}
      />
    );
  });

  return <View style={styles.container}>{rects}</View>;
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    rect: {
      borderRadius: 4,
    },
    activeRectColor: {
      color: theme.colors.accent2,
    },
    inactiveRectColor: {
      color: theme.colors.disabled,
    },
  });

export default RatingRects;
