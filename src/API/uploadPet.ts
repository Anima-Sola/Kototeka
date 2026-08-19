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

  let apiKey = store.apiKey;

  if (store.petsType === "cats" && store.userCatApiKey !== "")
    apiKey = store.userCatApiKey;
  if (store.petsType === "dogs" && store.userDogApiKey !== "")
    apiKey = store.userDogApiKey;

  const controller = new AbortController();
  let isTimeout = false;

  const timeoutId = setTimeout(() => {
    isTimeout = true;
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(store.baseUrl + URLs.upload, {
      method: "POST",
      body: formData,

      headers: {
        Accept: "application/json",
        "x-api-key": apiKey,
      },
      signal: controller.signal,
    });

    let data: any = null;

    try {
      data = await response.json();
    } catch {
      console.log("No JSON in response");
    }

    if (!response.ok) {
      throw {
        type: "http",
        status: response.status,
        message: data?.message || `HTTP error ${response.status}`,
        data,
      };
    }

    return data;
  } catch (error: any) {
    if (isTimeout) {
      throw {
        type: "timeout",
        message: "Request timed out",
      };
    }
    if (error?.type === "http") {
      throw error;
    }

    throw {
      type: "network",
      message: "Unable to connect to the server",
      originalError: error,
    };
  } finally {
    clearTimeout(timeoutId);
  }
};

export default uploadPetAPI;
