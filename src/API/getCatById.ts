import URLs from "../constants/urls";
import { headers } from "../constants/api";

const getCatById = async () => {
  try {
    const response = await fetch(URLs.images + "HDxfaNlLj", {
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

export default getCatById;
