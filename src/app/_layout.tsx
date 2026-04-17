import { useEffect } from "react";
import { Appearance } from "react-native";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useStore from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";
import * as ExpoSplashScreen from "expo-splash-screen";
import SplashScreen from "../components/SplashScreen/SplashScreen";

ExpoSplashScreen.hideAsync();

export default function RootLayout() {
  const {
    isAppReady,
    isSignedIn,
    setIsSignedIn,
    mode,
    setResolvedTheme,
    setUserName,
    setUserId,
  } = useStore();

  //Listening system theme changing
  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = Appearance.getColorScheme() || "light";
      setResolvedTheme(systemTheme);
    };

    updateTheme();

    const sub = Appearance.addChangeListener(updateTheme);
    return () => sub.remove();
  }, [mode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser.email, "User id: ", currentUser.uid);
        if(currentUser.displayName) setUserName(currentUser.displayName);
        setUserId(currentUser.uid);
        setIsSignedIn(true);
      } else {
        console.log("User is logged out");
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  if (isSignedIn === null) return null;

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