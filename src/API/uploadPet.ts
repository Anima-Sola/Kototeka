import { File } from "expo-file-system";
import { fetch } from "expo/fetch";
import URLs from "../constants/urls";
import useStore from "../store/store";

const uploadPetAPI = async (imageUri: string, userId: string) => {
  const store = useStore.getState();
  const formData = new FormData();
  const fileToUpload = new File(imageUri);

  formData.append("file", fileToUpload);
  formData.append("sub_id", userId);

  const response = await fetch(store.baseUrl + URLs.upload, {
    method: "POST",
    body: formData,

    headers: {
      Accept: "application/json",
      "x-api-key": store.apiKey,
    },
  });

  const responseData = await response.json();
  return responseData;
};

export default uploadPetAPI;