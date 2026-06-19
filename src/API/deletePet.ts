import URLs from "../constants/urls";
import { headers } from "../constants/api";
import fetchAPI from "./fetchAPI";

const deletePetAPI = async (id: string | number) => {
  const strId = id.toString();

  await fetchAPI(
    URLs.images + "/" + strId,
    {
      method: "DELETE",
      headers,
    },
    false,
  );
};

export default deletePetAPI;
