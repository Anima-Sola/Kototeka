import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const addFavouritePetAPI = async (image_id: string, userId: string) => {
  const params = {
    image_id,
    sub_id: userId,
  };

  const response = await fetchAPI(URLs.favourites, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  return response;
};

export default addFavouritePetAPI;
