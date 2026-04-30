import { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as Font from "expo-font";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fetchUserData from "../../API/fetchUserData";
import useStore from "../../store/store";
import fontSizes from "../../constants/fontSizes";

const backgroundImage = require("../../../assets/Images/splash.jpeg");

const SplashScreen = () => {
  const styles = useThemedStyles(createStyles);
  const { isSignedIn, setIsAppReady, isFontsLoaded, setIsFontsLoaded, userId } = useStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        if (!isFontsLoaded) {
          await Font.loadAsync({
            AmaticBold: require("../../../assets/fonts/AmaticSC-Bold.ttf"),
            AmaticRegular: require("../../../assets/fonts/AmaticSC-Regular.ttf"),
            ShantellRegular: require("../../../assets/fonts/ShantellSans-Regular.ttf"),
            ShantellBold: require("../../../assets/fonts/ShantellSans-Bold.ttf"),
            ShantellLightItalic: require("../../../assets/fonts/ShantellSans-LightItalic.ttf"),
          });
          setIsFontsLoaded(true);
        }
        if (isSignedIn) {
          await fetchUserData(userId);
        }
      } catch (error: any) {
        throw error;
      } finally {
        if (isSignedIn !== null) setTimeout(() => setIsAppReady(true), 2000);
      }
    };

    prepare();
  }, [isSignedIn]);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <Text style={styles.logo}>Purrly</Text>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={50} color={styles.activityIndicatorColor.color} />
        </View>
        <Text style={styles.text}>Loading</Text>
      </ImageBackground>
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.main,
    },
    image: {
      flex: 1,
      paddingVertical: 120,
      alignItems: 'center',
    },
    logo: {
      fontSize: fontSizes.FONT70,
      color: theme.colors.white,
      fontFamily: "AmaticBold",
    },
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: "center",
    },
    activityIndicatorColor: {
      color: theme.colors.white,
    },
    text: {
      fontSize: fontSizes.FONT20,
      fontFamily: "ShantellRegular",
      color: theme.colors.white,
    },
  });

export default SplashScreen;
