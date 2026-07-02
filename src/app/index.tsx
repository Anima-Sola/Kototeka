import { Redirect } from "expo-router";
import useStore from "../store/store";

export default function Index() {
  const { isSignedIn, isOnboarding } = useStore();

  if (isOnboarding && !isSignedIn) {
    return <Redirect href="/(onboarding)/onboarding" />;
  }

  return <Redirect href={isSignedIn ? "/(main)" : "/(auth)"} />;
}