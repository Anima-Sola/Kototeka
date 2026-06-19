import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="petProfile" />
      <Stack.Screen name="favouritePetProfile" />
      <Stack.Screen name="uploadedPetProfile" />
    </Stack>
  );
}