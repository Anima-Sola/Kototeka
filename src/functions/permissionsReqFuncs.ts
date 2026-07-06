import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const requestMediaLibraryPermission = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted && permissionResult.accessPrivileges === "all") {
    return true;
  }

  Alert.alert(
    "Permission required",
    "Gallery access is disabled. Please enable it in Settings to continue.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => Linking.openSettings(),
      },
    ],
  );

  return false;
};

export const requestCameraPermission = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted) {
    return true;
  }

  Alert.alert(
    "Permission required",
    "Camera access is disabled. Please enable it in Settings to continue.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => Linking.openSettings(),
      },
    ],
  );

  return false;
};