import URLs from "../constants/urls";
import { headers } from "../constants/api";

type reqParams = {
  limit?: number;
};

const getCats = async ({ limit = 10 }: reqParams) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    //has_breeds: "1",
  });

  try {
    const response = await fetch(URLs.images + "/search?" + params, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getCats;
