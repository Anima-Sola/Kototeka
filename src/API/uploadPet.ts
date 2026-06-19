import URLs from "../constants/urls";
import { formHeaders } from "../constants/api";
import fetchAPI from "./fetchAPI";

const uploadPetAPI = async (imageUri: string, userId: string) => {
  const formData = new FormData();
  const fileName = imageUri.split(/[\\/]/).pop();

  formData.append("file", {
    uri: imageUri,
    name: fileName,
    type: "image/jpeg",
  } as any);
  formData.append("sub_id", userId);

  const response = await fetchAPI(URLs.upload, {
    method: "POST",
    headers: formHeaders,
    body: formData,
  });

  return response;
};

export default uploadPetAPI;
