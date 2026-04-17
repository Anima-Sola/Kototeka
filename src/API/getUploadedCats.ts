import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getUploadedCatsAPI = async (limit: number, sub_id: string) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sub_id,
  });

  try {
    const response = await fetchAPI(URLs.images + "/?" + params, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getUploadedCatsAPI;
