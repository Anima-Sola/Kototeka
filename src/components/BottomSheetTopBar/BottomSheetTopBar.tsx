import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

type BottomSheetTopBarType = {
  title?: string;
};

const BottomSheetTopBar: FC<BottomSheetTopBarType> = ({ title = "" }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.line} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },
    bar: {
      width: "100%",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
      height: 20,
      alignItems: "center",
    },
    line: {
      marginVertical: 10,
      width: 120,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.accent,
    },
    title: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
      marginTop: 10,
    },
  });

export default BottomSheetTopBar;
