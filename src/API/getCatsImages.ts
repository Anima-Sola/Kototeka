import { API_KEY } from "../constants/apiKey";
import URLs from "../constants/urls";

type reqParams = {
  limit?: number;
  
};

const getCatsImages = async ({ limit = 10 }: reqParams) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    has_breeds: '1',
  });

  try {
    const response = await fetch(URLs.images + params, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getCatsImages;
