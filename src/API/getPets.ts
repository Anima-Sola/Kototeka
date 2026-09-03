import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

type reqParams = {
  limit: number;
  has_breeds: boolean;
  breed_ids: string;
};

const getPetsAPI = async (params: reqParams) => {
  let queryParams: URLSearchParams;

  if (params.breed_ids !== "") {
    queryParams = new URLSearchParams({
      limit: String(params.limit),
      breed_ids: params.breed_ids,
    });
  } else if (params.has_breeds) {
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
