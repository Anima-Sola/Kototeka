import { File, Directory, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { Asset } from "expo-media-library";

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