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
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while receiving data:", error);
    store.showErrorToast("Error while receiving data");
    throw error;
  }
};

export default fetchAPI;
