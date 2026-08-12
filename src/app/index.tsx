import { Redirect } from "expo-router";
import useStore from "../store/store";

export default function Index() {
  const { isAppReady, isSignedIn, isOnboarding } = useStore();

  if (!isAppReady || isSignedIn === null) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(main)" />;
  }

  if (isOnboarding) {
    return <Redirect href="/(onboarding)/onboarding0" />;
  }

  return <Redirect href="/(auth)" />;
}
