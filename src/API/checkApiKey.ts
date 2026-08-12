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

  try {
    const result = await fetch(baseUrl + URLs.favourites + "/?" + params, {
      headers: {
        ...headers,
        "x-api-key": apiKey,
      },
    });
    return result.status;
  } catch (error: any) {
    throw error;
  }
};

export default checkApiKeyAPI;
