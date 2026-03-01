import { Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { favouriteCatType } from "../constants/types";

export const isElementInArray = (
  element: string,
  array: Array<favouriteCatType>,
): favouriteCatType | undefined => {
  return array.find((item) => element === item.image.id);
};

export const shareImage = async (
  imageUrl: string,
  title?: string,
  message?: string,
): Promise<void> => {
  try {
    // Генерируем имя файла из URL
    const fileName = imageUrl.split("/").pop() || "image.jpg";
    const filePath = FileSystem.cacheDirectory + fileName;

    // Скачиваем изображение
    await FileSystem.downloadAsync(imageUrl, filePath);

    // Делимся локальным файлом
    await Share.share({
      url: filePath,
      title: title || "Поделиться изображением",
      message: message || "Посмотри это изображение кота!",
    });
  } catch (error) {
    console.error("Ошибка при отправке изображения:", error);
    throw error;
  }
};
