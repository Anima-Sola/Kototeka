import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

type reqParams = {
  limit?: number;
};

const getUploadedCatsAPI = async ({ limit = 10 }: reqParams) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  try {
    const response = await fetchAPI(URLs.images + '/?' + params, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getUploadedCatsAPI;
