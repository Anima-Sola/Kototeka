import { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import NetInfo from "@react-native-community/netinfo";
import { auth } from "../../../firebaseConfig";
import * as Font from "expo-font";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import useStore from "../../store/store";

const backgroundImage = require("../../../assets/Images/splashImage.png");

const SplashScreen = () => {
  const styles = useThemedStyles(createStyles);
  const { isSignedIn, isHydrated, setIsAppReady, setIsSignedIn } = useStore();
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const netState = await NetInfo.fetch();

      if (!netState.isConnected && isSignedIn === null) {
        setIsSignedIn(false);
        return;
      }

      setIsSignedIn(!!currentUser);
      setIsAuthResolved(true);
    });

    return unsubscribe;
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated || !isAuthResolved) return;

    const prepare = async () => {
      await loadFonts();

      setTimeout(() => {
        setIsAppReady(true);
      }, 2000);
    };

    prepare();
  }, [isHydrated, isAuthResolved]);

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

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} resizeMode="cover" style={styles.image} />
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          size={40}
          color={styles.activityIndicatorColor.color}
        />
      </View>
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
