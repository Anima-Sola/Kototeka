import { ReactNode } from "react";
import { NavigationBar } from "expo-navigation-bar";
import { PressablesConfig } from "pressto";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type WrapperProps = {
  children: ReactNode;
};

export default function OnboardingWrapper({ children }: WrapperProps) {
  return (
    <GestureHandlerRootView>
      <PressablesConfig
        animationType="spring"
        animationConfig={{ damping: 10, stiffness: 200 }}
        config={{ minScale: 0.9, activeOpacity: 0.6 }}
      ></PressablesConfig>
      {children}
      <NavigationBar hidden={false} />
    </GestureHandlerRootView>
  );
}
