import URLs from "../constants/urls";
import { headers } from "../constants/api";

const deleteCatAPI = async (id: string | number) => {
  const strId = id.toString();
  try {
    const response = await fetch(URLs.images + "/" + strId, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default deleteCatAPI;
