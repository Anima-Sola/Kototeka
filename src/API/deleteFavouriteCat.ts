import URLs from "../constants/urls";
import { headers } from "../constants/api"; 

const deleteFavouriteCatAPI = async (id: string | number) => {
  const strId = id.toString()
  try {
    const response = await fetch(URLs.favourites + '/' + strId, {
      method: "DELETE",
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

export default deleteFavouriteCatAPI;
