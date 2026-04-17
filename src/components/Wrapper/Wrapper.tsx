import { ReactNode } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ ...styles.statusBar, height: statusBarHeight }} />
      {children}
    </SafeAreaProvider>
  );
}

export const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      backgroundColor: theme.colors.statusBar,
    },
  });
