import URLs, { CATS_BASE_URL } from "../constants/urls";
import { CATS_API_KEY } from "../constants/api";
import useStore from "../store/store";
import { headers } from "../constants/api";

const getCatsBreedsAPI = async () => {
  const store = useStore.getState();
  const apiKey =
    store.userCatApiKey !== "" ? store.userCatApiKey : CATS_API_KEY;

  const options: any = {
    headers,
  };

  options.headers["x-api-key"] = apiKey;

  const controller = new AbortController();
  let isTimeout = false;

  const timeoutId = setTimeout(() => {
    isTimeout = true;
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(CATS_BASE_URL + URLs.breeds, {
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

export default getCatsBreedsAPI;
