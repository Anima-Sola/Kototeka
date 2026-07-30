import { Stack } from "expo-router";

export default function ApiKeysLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="apikeys" />
    </Stack>
  );
}
