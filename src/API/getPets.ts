import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

type reqParams = {
  limit: number;
  has_breeds: boolean;
};

const getPetsAPI = async (params: reqParams) => {
  let queryParams: URLSearchParams;

  if (params.has_breeds) {
    queryParams = new URLSearchParams({
      limit: String(params.limit),
      has_breeds: String(params.has_breeds),
    });
  } else {
    queryParams = new URLSearchParams({
      limit: String(params.limit),
    });
  }

  const response = await fetchAPI(URLs.images + "/search?" + queryParams, {
    headers,
  });

  return response;
};

export default getPetsAPI;
