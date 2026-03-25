import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const deleteFavouriteCatAPI = async (id: string | number) => {
  const strId = id.toString();
  try {
    await fetchAPI(
      URLs.favourites + "/" + strId,
      {
        method: "DELETE",
        headers,
      },
      false,
    );
  } catch (error: any) {
    throw error;
  }
};

export default deleteFavouriteCatAPI;
