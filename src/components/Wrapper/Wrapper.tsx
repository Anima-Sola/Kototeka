import { ReactNode } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../constants/colors";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ ...styles.statusBar, height: statusBarHeight }} />
      {children}
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
