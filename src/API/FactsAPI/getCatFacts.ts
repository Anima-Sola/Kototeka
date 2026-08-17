import { CATS_FACTS_BASE_URL } from "../../constants/urls";
import { headers } from "../../constants/api";

const getCatFactsAPI = async (page?: number) => {
  const pageParam = page ? `?page=${page}` : "";

  try {
    const response = await fetch(CATS_FACTS_BASE_URL + pageParam, { headers });

    return response.json();
  } catch (error: any) {
    throw error;
  }
};

export default getCatFactsAPI;
