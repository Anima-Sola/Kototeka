import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const getCatByIdAPI = async (id: string) => {
  try {
    const response = await fetchAPI(URLs.images + '/' + id, {
      headers,
    });

    return response;
  } catch (error: any) {
    throw error;
  }
};

export default getCatByIdAPI;
