import { Alert } from "react-native";
import useStore from "../store/store";

const fetchAPI = async (
  url: string,
  options: any,
) => {
  const store = useStore.getState();
  let apiKey = store.apiKey;

  if (store.petsType === "cats" && store.userCatApiKey !== "")
    apiKey = store.userCatApiKey;
  if (store.petsType === "dogs" && store.userDogApiKey !== "")
    apiKey = store.userDogApiKey;

  options.headers["x-api-key"] = apiKey;

  try {
    const response = await fetch(store.baseUrl + url, options);

    if (!response.ok) {
      throw {
        status: 429,
      };
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.status === 429)
      Alert.alert(
        "Too many requests to the server",
        'For more requests, please add your own API keys. Read more in the "Settings" tab.',
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
      );
    else store.showErrorToast("Error while receiving data");
    throw error;
  }
};

export default fetchAPI;
