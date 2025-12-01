import URLs from "../constants/urls";
import { headers } from "../constants/api"; 

const addFavouriteCat = async (image_id: string) => {
  const params = {
    image_id,
  };

  try {
    const response = await fetch(URLs.favourites, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
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

export default addFavouriteCat;
