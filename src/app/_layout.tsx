import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/colors";

export default function RootLayout() {
  const isLoggedIn = false;
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

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
