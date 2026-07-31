import { Redirect } from "expo-router";
import useStore from "../store/store";

export default function Index() {
  const { isSignedIn, isOnboarding } = useStore();

  if (isSignedIn === null) {
    return null;
  }

  if (isOnboarding && !isSignedIn) {
    return <Redirect href="/(onboarding)/onboarding0" />;
  }

  return <Redirect href={isSignedIn ? "/(main)" : "/(auth)"} />;
}