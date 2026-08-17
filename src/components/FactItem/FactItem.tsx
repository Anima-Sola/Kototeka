import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

type FactItemType = {
  text: string;
};

const FactItem: FC<FactItemType> = ({ text }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.leftQuoteContainer}>
        <Fontisto
          name="quote-a-right"
          size={18}
          color={styles.iconColor.color}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.rightQuoteContainer}>
        <Fontisto
          name="quote-a-left"
          size={18}
          color={styles.iconColor.color}
        />
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.mainText,
      padding: 10,
      borderRadius: 10,
      marginBottom: 30,
    },
    leftQuoteContainer: {
      position: "absolute",
      width: 40,
      left: 10,
      top: -10,
      backgroundColor: theme.colors.main,
      alignItems: "center",
    },
    rightQuoteContainer: {
      position: "absolute",
      width: 40,
      backgroundColor: theme.colors.main,
      alignItems: "center",
      right: 10,
      bottom: -10,
    },
    text: {
      color: theme.colors.mainText,
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
      textAlign: "justify",
    },
    iconColor: {
      color: theme.colors.accent,
    },
  });

export default FactItem;
