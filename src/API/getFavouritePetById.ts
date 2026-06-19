import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getFavouritePetByIdAPI = async (id: string) => {
  const response = await fetchAPI(URLs.favourites + "/" + id, {
    headers,
  });

  return response;
};

export default getFavouritePetByIdAPI;
