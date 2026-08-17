import { DOGS_FACTS_BASE_URL } from "../../constants/urls";
import { headers } from "../../constants/api";

const getDogFactsAPI = async () => {
  try {
    const response = await fetch(DOGS_FACTS_BASE_URL + "?limit=5", { headers });

    return response.json();
  } catch (error: any) {
    throw error;
  }
};

export default getDogFactsAPI;
