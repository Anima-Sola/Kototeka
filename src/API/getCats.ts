import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

type reqParams = {
  limit?: number;
};

const getCatsAPI = async ({ limit = 10 }: reqParams) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    //has_breeds: "1",
  });

  try {
    const response = await fetchAPI(URLs.images + "/search?" + params, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getCatsAPI;
