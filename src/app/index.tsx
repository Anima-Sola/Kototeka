import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "./(home)/home";
import Login from "./(auth)/login";
import { useAuthStore } from "../store/store";
import Colors from "../constants/colors";

export default function index() {
  const { isSignedIn } = useAuthStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ ...styles.statusBar, height: statusBarHeight }} />
      {isSignedIn ? <Home /> : <Login />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.statusBar,
  },
});
