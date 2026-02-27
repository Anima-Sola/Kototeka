import URLs from "../constants/urls";
import { headers } from "../constants/api";

const getCatByIdAPI = async (id: string) => {
  try {
    const response = await fetch(URLs.images + '/' + id, {
      headers,
    });

    if (!response.ok) {
      return [];
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getCatByIdAPI;
