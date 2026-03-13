import URLs from "../constants/urls";
import { formHeaders } from "../constants/api";

const uploadCatAPI = async (imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split(/[\\/]/).pop();
  
  formData.append("file", {
    uri: imageUri,
    name: fileName,
    type: "image/jpeg",
  } as any);

  try {
    const response = await fetch(URLs.upload, {
      method: "POST",
      headers: formHeaders,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default uploadCatAPI;
