import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const deletePetAPI = async (id: string | number) => {
  const strId = id.toString();

  const response = await fetchAPI(URLs.images + "/" + strId, {
    method: "DELETE",
    headers,
  });

  return response;
};

export default deletePetAPI;
