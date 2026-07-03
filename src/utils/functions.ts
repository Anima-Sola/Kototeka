import { Alert, Linking } from "react-native";
import { File, Directory, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { favouritePetType } from "../constants/types";
import { Asset } from "expo-media-library";

export const isElementInArray = (
  element: string,
  array: Array<favouritePetType>,
): favouritePetType | undefined => {
  return array.find((item) => element === item.image.id);
};

export let downloadResumable: FileSystemLegacy.DownloadResumable | null = null;

const getFileExtension = (pathOrUrl: string) => {
  if (!pathOrUrl || typeof pathOrUrl !== "string") {
    return "";
  }

  const cleanPath = pathOrUrl.split(/[?#]/)[0];
  const fileName = cleanPath.split("/").pop();

  if (!fileName || !fileName.includes(".")) {
    return "";
  }

  return fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
};

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

export async function downloadAndSaveImage(
  url: string,
  onProgress?: (progress: number) => void,
) {
  /*const hasPermission = await requestMediaLibraryPermission();

  if (!hasPermission) {
    return;
  }

  const downloadDir = new Directory(Paths.cache, "downloads");

  if (!downloadDir.exists) {
    await downloadDir.create();
  }

  const fileName = `pet_image_${Date.now()}.` + getFileExtension(url);
  const file = new File(downloadDir, fileName);

  downloadResumable = FileSystemLegacy.createDownloadResumable(
    url,
    file.uri,
    {},
    ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
      if (totalBytesExpectedToWrite <= 0) {
        return;
      }
fhfghf
      const progress = totalBytesWritten / totalBytesExpectedToWrite;

      onProgress?.(progress);
    },
  );

  const downloadResult = await downloadResumable.downloadAsync();
  const uri = downloadResult?.uri;

  if (!uri) {
    return;
  }

  const fileInfo = await FileSystemLegacy.getInfoAsync(uri);
  if (!fileInfo.exists) {
    return;
  }

  return await Asset.create(file.uri);*/
}
