import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getFavouriteCatByIdAPI = async (id: string) => {
  try {
    const response = await fetchAPI(URLs.favourites + "/" + id, {
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default getFavouriteCatByIdAPI;
