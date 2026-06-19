import { File, Directory, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { favouritePetType } from "../constants/types";

export const isElementInArray = (
  element: string,
  array: Array<favouritePetType>,
): favouritePetType | undefined => {
  return array.find((item) => element === item.image.id);
};

export let downloadResumable: FileSystemLegacy.DownloadResumable | null = null;

export async function downloadAndSaveImage(
  url: string,
  onProgress?: (progress: number) => void,
) {
  const { granted } = await MediaLibrary.requestPermissionsAsync();

  if (!granted) {
    throw new Error("Media Library permission denied");
  }

  const downloadDir = new Directory(Paths.cache, "downloads");

  if (!downloadDir.exists) {
    await downloadDir.create();
  }

  const fileName =
    `image_${Date.now()}.` + url.substring(url.lastIndexOf(".") + 1);
  const file = new File(downloadDir, fileName);

  downloadResumable = FileSystemLegacy.createDownloadResumable(
    url,
    file.uri,
    {},
    ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
      if (totalBytesExpectedToWrite <= 0) {
        return;
      }

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

  return await MediaLibrary.saveToLibraryAsync(file.uri);
}
