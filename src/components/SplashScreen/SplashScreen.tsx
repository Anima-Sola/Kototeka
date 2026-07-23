import { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import * as Font from "expo-font";
import { NavigationBar } from "expo-navigation-bar";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import fetchUserData from "../../API/fetchUserData";
import useStore from "../../store/store";
import SplashErrorScreen from "./SplashErrorScreen";

const backgroundImage = require("../../../assets/Images/splashImage.png");

const SplashScreen = () => {
  const styles = useThemedStyles(createStyles);
  const [loadingError, setLoadingError] = useState(false);
  const {
    isSignedIn,
    setIsAppReady,
    isFontsLoaded,
    setIsFontsLoaded,
    userId,
    setUserName,
    setUserId,
    setIsSignedIn,
  } = useStore();

  //Google authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(
          "User is logged in:",
          currentUser.email,
          "User id: ",
          currentUser.uid,
        );
        if (currentUser.displayName) setUserName(currentUser.displayName);
        setUserId(currentUser.uid);
        setIsSignedIn(true);
      } else {
        console.log("User is logged out");
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadFonts = async () => {
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
    } catch (error: any) {
      throw error;
    }
  };

  const prepare = async () => {
    setLoadingError(false);

    try {
      await loadFonts();
      if (isSignedIn) {
        await fetchUserData(userId);
      }
    } catch (error: any) {
      setLoadingError(true);
    } finally {
      if (isSignedIn !== null && !loadingError)
        setTimeout(() => setIsAppReady(true), 2000);
    }
  };

  useEffect(() => {
    prepare();
  }, [isSignedIn]);

  if (loadingError) {
    return <SplashErrorScreen onRetry={prepare} />;
  }

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} resizeMode="cover" style={styles.image} />
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          size={40}
          color={styles.activityIndicatorColor.color}
        />
      </View>
      <NavigationBar hidden={false} />
    </View>
  );
};

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.mainSplash,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 250,
      height: 250,
    },
    activityIndicatorContainer: {
      marginTop: 50,
    },
    activityIndicatorColor: {
      color: theme.colors.accent,
    },
  });

export default SplashScreen;
