import useStore from "../store/store";

const fetchAPI = async (url: string, options: any) => {
  const store = useStore.getState();
  let apiKey = store.apiKey;

  if (store.petsType === "cats" && store.userCatApiKey !== "")
    apiKey = store.userCatApiKey;
  if (store.petsType === "dogs" && store.userDogApiKey !== "")
    apiKey = store.userDogApiKey;

  options.headers["x-api-key"] = apiKey;

  const controller = new AbortController();
  let isTimeout = false;

  const timeoutId = setTimeout(() => {
    isTimeout = true;
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(store.baseUrl + url, {
      ...options,
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

export default fetchAPI;