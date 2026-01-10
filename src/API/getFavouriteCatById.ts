import URLs from "../constants/urls";
import { headers } from "../constants/api";

const getFavouriteCatByIdAPI = async (id: string) => {
  try {
    const response = await fetch(URLs.favourites + '/' +id, {
      headers,
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

export default getFavouriteCatByIdAPI;
