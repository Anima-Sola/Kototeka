import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type TextItemType = {
  name: string;
  text: string;
};

const TextItem: FC<TextItemType> = ({ name, text }) => {
  if (!text) return null;
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <Text selectable style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
    },
    header: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
    },
    text: {
      fontSize: fontSizes.FONT14,
      fontFamily: "ShantellRegular",
      color: theme.colors.mainText,
      textAlign: "justify",
    },
  });

export default TextItem;
