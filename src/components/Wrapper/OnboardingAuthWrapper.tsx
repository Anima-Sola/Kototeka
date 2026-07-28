import { ReactNode } from "react";
import { NavigationBar } from "expo-navigation-bar";
import { PressablesConfig } from "pressto";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "../../contexts/BottomSheetContext";
import useStore from "../../store/store";
import ErrorToast from "../Toast/ErrorToast";

type WrapperProps = {
  children: ReactNode;
};

export default function OnboardingAuthWrapper({ children }: WrapperProps) {
  const { toastMessage, isErrorToastVisible } = useStore();

  return (
    <GestureHandlerRootView>
      <PressablesConfig
        animationType="spring"
        animationConfig={{ damping: 10, stiffness: 200 }}
        config={{ minScale: 0.9, activeOpacity: 0.6 }}
      >
        <BottomSheetProvider>
          {isErrorToastVisible && <ErrorToast message={toastMessage} />}
          {children}
        </BottomSheetProvider>
      </PressablesConfig>
      <NavigationBar hidden={false} />
    </GestureHandlerRootView>
  );
}
