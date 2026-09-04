import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="petProfile" />
      <Stack.Screen name="favouritePetProfile" />
      <Stack.Screen name="uploadedPetProfile" />
      <Stack.Screen name="apikeys" />
      <Stack.Screen name="selectCatBreeds" />
      <Stack.Screen name="selectDogBreeds" />
    </Stack>
  );
}