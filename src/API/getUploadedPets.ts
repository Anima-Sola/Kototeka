import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getUploadedPetsAPI = async (limit: number, sub_id: string) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sub_id,
  });

  const response = await fetchAPI(URLs.images + "/?" + params, {
    headers,
  });

  return response;
};

export default getUploadedPetsAPI;
