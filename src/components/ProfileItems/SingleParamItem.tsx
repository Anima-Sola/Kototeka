import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import fontSizes from "../../constants/fontSizes";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type TextItemType = {
  name: string;
  param: string;
};

const SingleParamItem: FC<TextItemType> = ({ name, param }) => {
  if(!param) return null;
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text selectable style={styles.text}>
        {param}
      </Text>
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
    text: {
      fontSize: fontSizes.FONT32,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      alignSelf: "center",
    },
  });

export default SingleParamItem;
