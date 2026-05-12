import { ReactNode } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import useStore from "../../store/store";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
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
  const { toastMessage, isErrorToastVisible, isSuccessToastVisible } = useStore();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight;

  return (
    <BottomSheetProvider>
      <SafeAreaProvider style={styles.container}>
        <View style={{ ...styles.statusBar, height: statusBarHeight }} />
        {isSuccessToastVisible && <SuccessToast message={toastMessage} />}
        {isErrorToastVisible && <ErrorToast message={toastMessage} />}
        {children}
      </SafeAreaProvider>
    </BottomSheetProvider>
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
