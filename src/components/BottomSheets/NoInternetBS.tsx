import { FC } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { Button } from "react-native-paper";
import { ITheme } from "../../constants/interfaces";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import fontSizes from "../../constants/fontSizes";
import BottomSheetTopBar from "../BottomSheetTopBar/BottomSheetTopBar";

const noInternetImage = require("../../../assets/Images/NoInternet.png");

type NoInternetBSType = {
  hideBottomSheet: () => void;
  onRetry: () => void;
};

const NoInternetBS: FC<NoInternetBSType> = ({ hideBottomSheet, onRetry }) => {
  const styles = useThemedStyles(createStyles);

  const onDismissBS = () => {
    hideBottomSheet();
    setTimeout(() => {
      onRetry();
    }, 350);
  };

  return (
    <View style={styles.container}>
      <BottomSheetTopBar />
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
          onPress={onDismissBS}
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
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors.main,
      paddingHorizontal: 16,
    },
    content: {
      alignItems: "center",
      marginTop: -20,
    },
    image: {
      width: 100,
      height: 100,
    },
    title: {
      fontSize: fontSizes.FONT40,
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
      paddingBottom: Platform.OS === "ios" ? 30 : 60,
    },
  });

export default NoInternetBS;
