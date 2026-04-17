import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getFavouriteCatsAPI = async (sub_id: string) => {
  const params = new URLSearchParams({
    sub_id,
  });

  try {
    const response = await fetchAPI(URLs.favourites + "/?" + params, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getFavouriteCatsAPI;
