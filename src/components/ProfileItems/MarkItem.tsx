import { FC } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import RatingRects from "../RatingRects/RatingRects";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type MarkItemType = {
  name: string;
  mark: number;
};

const MarkItem: FC<MarkItemType> = ({ name, mark }) => {
  if (!mark) return null;
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.ratingContainer}>
        <RatingRects value={mark} />
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    header: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
    },
    ratingContainer: {
      marginTop: Platform.OS === "ios" ? 3 : 8,
    },
  });

export default MarkItem;
