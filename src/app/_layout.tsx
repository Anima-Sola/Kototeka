import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import useStore from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setIsSignedIn } = useStore();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    AmaticBold: require("../../assets/fonts/AmaticSC-Bold.ttf"),
    AmaticRegular: require("../../assets/fonts/AmaticSC-Regular.ttf"),
    ShantellRegular: require("../../assets/fonts/ShantellSans-Regular.ttf"),
    ShantellBold: require("../../assets/fonts/ShantellSans-Bold.ttf"),
    ShantellLightItalic: require("../../assets/fonts/ShantellSans-LightItalic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => SplashScreen.hideAsync(), 2000);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser.email);
        setIsSignedIn(true);
        router.replace("/(main)");
      } else {
        console.log("User is logged out");
        setIsSignedIn(false);
        router.replace("/(auth)/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const isSignedIn = useStore((state) => state.isSignedIn);

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
