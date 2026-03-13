import URLs from "../constants/urls";
import { headers } from "../constants/api";

type reqParams = {
  limit?: number;
};

const getUploadedCatsAPI = async ({ limit = 10 }: reqParams) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  try {
    const response = await fetch(URLs.images + '/?' + params, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getUploadedCatsAPI;
