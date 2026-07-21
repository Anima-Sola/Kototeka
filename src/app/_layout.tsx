import { useEffect } from "react";
import { AppState, Appearance, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import useStore from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";
import OnboardingWrapper from "../components/Wrapper/OnboardingWrapper";
import SplashScreen from "../components/SplashScreen/SplashScreen";

export default function RootLayout() {
  const {
    isAppReady,
    isSignedIn,
    isOnboarding,
    setResolvedTheme,
    mode,
  } = useStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = colorScheme === "dark" ? "dark" : "light";
      setResolvedTheme(systemTheme);
    };

    updateTheme();

    const appearanceSub = Appearance.addChangeListener(() => {
      console.log('changed');
      updateTheme();
    });

    const appStateSub = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        updateTheme();
      }
    });

    return () => {
      appearanceSub.remove();
      appStateSub.remove();
    };
  }, [colorScheme, setResolvedTheme, mode]);

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
