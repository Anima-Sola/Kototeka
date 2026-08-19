import { CATS_BASE_URL, DOGS_BASE_URL } from "../constants/urls";
import { headers } from "../constants/api";
import URLs from "../constants/urls";

const checkApiKeyAPI = async (
  petsType: "cats" | "dogs",
  apiKey: string,
  sub_id: string,
) => {
  const params = new URLSearchParams({
    sub_id,
  });

  const baseUrl = petsType === "cats" ? CATS_BASE_URL : DOGS_BASE_URL;

  const controller = new AbortController();
  let isTimeout = false;

  const timeoutId = setTimeout(() => {
    isTimeout = true;
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(baseUrl + URLs.favourites + "/?" + params, {
      headers: {
        ...headers,
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

export default checkApiKeyAPI;
