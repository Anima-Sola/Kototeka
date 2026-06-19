import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const deleteFavouritePetAPI = async (id: string | number) => {
  const strId = id.toString();

  await fetchAPI(
    URLs.favourites + "/" + strId,
    {
      method: "DELETE",
      headers,
    },
    false,
  );
};

export default deleteFavouritePetAPI;
