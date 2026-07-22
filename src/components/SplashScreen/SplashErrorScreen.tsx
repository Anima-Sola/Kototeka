import { FC } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fontSizes from "../../constants/fontSizes";

const noInternetImage = require("../../../assets/Images/NoInternet.png");

type SplashErrorScreenProps = {
  onRetry?: () => void;
};

const SplashErrorScreen: FC<SplashErrorScreenProps> = ({ onRetry }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={noInternetImage}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={styles.title}>Whoops!</Text>
        <Text style={styles.message}>
          Please check your Internet connection and try again.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={"contained"}
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={onRetry}
        >
          Try again
        </Button>
      </View>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
      padding: 16,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 250,
      height: 250,
    },
    title: {
      fontSize: fontSizes.FONT50,
      color: theme.colors.mainText,
      fontFamily: "AmaticBold",
      marginBottom: 8,
    },
    message: {
      fontSize: fontSizes.FONT20,
      color: theme.colors.mainText,
      fontFamily: "ShantellRegular",
      marginBottom: 16,
      textAlign: "center",
      width: "80%",
    },
    button: {
      backgroundColor: theme.colors.accent,
    },
    labelButton: {
      color: theme.colors.secondary,
      fontSize: fontSizes.FONT18,
      fontFamily: "ShantellBold",
      lineHeight: 30,
    },
    buttonContainer: {
      width: "100%",
      paddingBottom: 30,
    },
    iconColor: {
      color: theme.colors.accent,
    },
  });

export default SplashErrorScreen;
