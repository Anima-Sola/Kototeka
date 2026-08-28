import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getAllBreedsAPI = async () => {
  const response = await fetchAPI(URLs.breeds, {
    headers,
  });

  return response;
};

export default getAllBreedsAPI;
