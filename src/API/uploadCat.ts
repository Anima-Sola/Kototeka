import URLs from "../constants/urls";
import { formHeaders } from "../constants/api";
import fetchAPI from "./fetchAPI";

const uploadCatAPI = async (imageUri: string) => {
  const formData = new FormData();
  const fileName = imageUri.split(/[\\/]/).pop();

  formData.append("file", {
    uri: imageUri,
    name: fileName,
    type: "image/jpeg",
  } as any);

  try {
    const response = await fetchAPI(URLs.upload, {
      method: "POST",
      headers: formHeaders,
      body: formData,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default uploadCatAPI;
