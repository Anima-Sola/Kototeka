import { useEffect } from "react";
import { Appearance } from "react-native";
import { Stack } from "expo-router";
import useStore from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";
import OnboardingWrapper from "../components/Wrapper/OnboardingWrapper";
import * as ExpoSplashScreen from "expo-splash-screen";
import SplashScreen from "../components/SplashScreen/SplashScreen";

//ExpoSplashScreen.hideAsync();

export default function RootLayout() {
  const { isAppReady, isSignedIn, isOnboarding, setResolvedTheme, mode } =
    useStore();

  //Listening system theme changing
  useEffect(() => {
    const updateTheme = () => {
      const systemTheme =
        Appearance.getColorScheme() === "dark" ? "dark" : "light";
      setResolvedTheme(systemTheme);
    };

    updateTheme();

    const sub = Appearance.addChangeListener(updateTheme);
    return () => sub.remove();
  }, [mode]);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  if (isOnboarding && !isSignedIn)
    return (
      <OnboardingWrapper>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" />
        </Stack>
      </OnboardingWrapper>
    );

  return (
    <Wrapper>
      {isSignedIn ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" />
          <Stack.Screen name="(profile)"></Stack.Screen>
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
        </Stack>
      )}
    </Wrapper>
  );
}
