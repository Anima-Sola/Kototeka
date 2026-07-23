import { ReactNode } from "react";
import { NavigationBar } from "expo-navigation-bar";
import { BottomSheetProvider } from "../../contexts/BottomSheetContext";

type WrapperProps = {
  children: ReactNode;
};

export default function OnboardingWrapper({ children }: WrapperProps) {
  return (
    <BottomSheetProvider>
      {children}
      <NavigationBar hidden={false} />
    </BottomSheetProvider>
  );
}
