import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import useStore from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";
import OnboardingAuthWrapper from "../components/Wrapper/OnboardingAuthWrapper";
import SplashScreen from "../components/SplashScreen/SplashScreen";

export default function RootLayout() {
  const { isAppReady, isSignedIn, isOnboarding, setResolvedTheme, mode } =
    useStore();
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    if (mode === "system") {
      setResolvedTheme(systemColorScheme === "dark" ? "dark" : "light");
    } else {
      setResolvedTheme(mode);
    }
  }, [mode, systemColorScheme, setResolvedTheme]);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  if (isOnboarding && !isSignedIn)
    return (
      <OnboardingAuthWrapper>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
        </Stack>
      </OnboardingAuthWrapper>
    );

  return (
    <>
      {isSignedIn ? (
        <Wrapper>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(main)" />
            <Stack.Screen name="(profile)"></Stack.Screen>
          </Stack>
        </Wrapper>
      ) : (
        <OnboardingAuthWrapper>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
          </Stack>
        </OnboardingAuthWrapper>
      )}
    </>
  );
}
