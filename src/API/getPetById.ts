import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getPetByIdAPI = async (id: string) => {
  const response = await fetchAPI(URLs.images + "/" + id, {
    headers,
  });

  return response;
};

export default getPetByIdAPI;
