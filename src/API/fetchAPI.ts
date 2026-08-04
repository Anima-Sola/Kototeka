import useStore from "../store/store";

const fetchAPI = async (
  url: string,
  options: any,
  returnData: boolean = true,
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
    if (!returnData) return;

    if (!response.ok) {
      throw {
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.status === 429)
      store.showErrorToast(
        'Too many requests. Add your own API key. Instructions in the "Settings" section.',
      );
    else store.showErrorToast("Error while receiving data.");
    throw error;
  }
};

export default fetchAPI;