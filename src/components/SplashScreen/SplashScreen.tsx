import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as Font from "expo-font";
import { NavigationBar } from "expo-navigation-bar";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fetchUserData from "../../API/fetchUserData";
import useStore from "../../store/store";
import fontSizes from "../../constants/fontSizes";

const backgroundImage = require("../../../assets/Images/splashImage.png");

const SplashScreen = () => {
  const styles = useThemedStyles(createStyles);
  const { isSignedIn, setIsAppReady, isFontsLoaded, setIsFontsLoaded, userId } =
    useStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        if (!isFontsLoaded) {
          await Font.loadAsync({
            AmaticBold: require("../../../assets/fonts/AmaticSC-Bold.ttf"),
            ShantellRegular: require("../../../assets/fonts/ShantellSans-Regular.ttf"),
            ShantellBold: require("../../../assets/fonts/ShantellSans-Bold.ttf"),
            ShantellLightItalic: require("../../../assets/fonts/ShantellSans-LightItalic.ttf"),
            ShantellLight: require("../../../assets/fonts/ShantellSans-Light.ttf"),
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
      <Text style={styles.logo}>Paws&Love</Text>
      <Image source={backgroundImage} resizeMode="cover" style={styles.image} />
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          size={50}
          color={styles.activityIndicatorColor.color}
        />
      </View>
      <Text style={styles.text}>Loading</Text>
      <NavigationBar style="light" hidden={false} />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.spashScreenBackground,
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: 50,
    },
    image: {
      width: 300,
      height: 300,
    },
    logo: {
      fontSize: fontSizes.FONT70,
      color: theme.colors.white,
      fontFamily: "AmaticBold",
    },
    activityIndicatorContainer: {
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
