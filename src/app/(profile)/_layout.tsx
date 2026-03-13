import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="catProfile" />
      <Stack.Screen name="favouriteCatProfile" />
      <Stack.Screen name="uploadedCatProfile" />
    </Stack>
  );
}