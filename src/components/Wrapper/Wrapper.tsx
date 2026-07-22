import { ReactNode } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PressablesConfig } from "pressto";
import useStore from "../../store/store";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationBar } from "expo-navigation-bar";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { ITheme } from "../../constants/interfaces";
import { BottomSheetProvider } from "../../contexts/BottomSheetContext";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  const styles = useThemedStyles(createStyles);
  const { toastMessage, isErrorToastVisible, isSuccessToastVisible } =
    useStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <GestureHandlerRootView>
      <PressablesConfig
        animationType="spring"
        animationConfig={{ damping: 10, stiffness: 200 }}
        config={{ minScale: 0.9, activeOpacity: 0.6 }}
      >
        <BottomSheetProvider>
          <SafeAreaProvider style={styles.container}>
            <View style={{ ...styles.statusBar, height: statusBarHeight }} />
            {isSuccessToastVisible && <SuccessToast message={toastMessage} />}
            {isErrorToastVisible && <ErrorToast message={toastMessage} />}
            {children}
            <NavigationBar style="auto" hidden={false} />
          </SafeAreaProvider>
        </BottomSheetProvider>
      </PressablesConfig>
    </GestureHandlerRootView>
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
