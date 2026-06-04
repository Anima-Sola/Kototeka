import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

type reqParams = {
  limit: number;
  has_breeds: number;
};

const getCatsAPI = async (params: reqParams) => {
  const queryParams = new URLSearchParams({
    limit: String(params.limit),
    has_breeds: String(params.has_breeds),
  });

  try {
    const response = await fetchAPI(URLs.images + "/search?" + queryParams, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getCatsAPI;
