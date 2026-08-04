import { Stack } from "expo-router";

export default function PetOfTheDayLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="petoftheday" />
    </Stack>
  );
}
