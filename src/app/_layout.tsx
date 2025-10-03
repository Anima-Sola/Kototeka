import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAuthStore } from "../store/store";
import Wrapper from "../components/Wrapper/Wrapper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setIsSignedIn } = useAuthStore();
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    AmaticBold: require("../../assets/Fonts/AmaticSC-Bold.ttf"),
    AmaticRegular: require("../../assets/Fonts/AmaticSC-Regular.ttf"),
    ShantellRegular: require("../../assets/Fonts/ShantellSans-Regular.ttf"),
    ShantellBold: require("../../assets/Fonts/ShantellSans-Bold.ttf"),
    ShantellLightItalic: require("../../assets/Fonts/ShantellSans-LightItalic.ttf"),
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

  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  return (
    <Wrapper>
      <Stack screenOptions={{ headerShown: false }}>
        {isSignedIn ? <Stack.Screen name="(main)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </Wrapper>
  );
}
