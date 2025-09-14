import { useEffect } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    AmaticBold: require("../../assets/fonts/AmaticSC-Bold.ttf"),
    AmaticRegular: require("../../assets/fonts/AmaticSC-Regular.ttf"),
    ShantellRegular: require("../../assets/fonts/ShantellSans-Regular.ttf"),
    ShantellBold: require("../../assets/fonts/ShantellSans-Bold.ttf"),
    ShantellLightItalic: require("../../assets/fonts/ShantellSans-LightItalic.ttf"),
  });
  const isLoggedIn = false;
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {Platform.OS === "ios" ? (
        <View style={{ ...styles.statusBarColorIos, height: statusBarHeight }} />
      ) : null}
      <ExpoStatusBar style="auto" backgroundColor={Colors.statusBar} />
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? <Stack.Screen name="(main)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarColorIos: {
    backgroundColor: Colors.statusBar,
  },
});
