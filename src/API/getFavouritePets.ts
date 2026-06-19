import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getFavouritePetsAPI = async (sub_id: string) => {
  const params = new URLSearchParams({
    sub_id,
  });

  const response = await fetchAPI(URLs.favourites + "/?" + params, {
    headers,
  });

  return response;
};

export default getFavouritePetsAPI;
