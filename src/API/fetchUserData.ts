import useStore from "../store/store";
import getCatByIdAPI from "./getCatById";
import getCatsAPI from "./getCats";
import getFavouriteCatsAPI from "./getFavouriteCats";
import getUploadedCatsAPI from "./getUploadedCats";
import { favouriteCatType } from "../constants/types";

const store = useStore.getState();

const getFavouriteCatsBreeds = async (favouriteCats: favouriteCatType[]) => {
  const promises = favouriteCats.map(async (favouriteCat) => {
    try {
      const response = await getCatByIdAPI(favouriteCat.image.id);
      if (response.breeds)
        store.addFavoriteCatBreeds(favouriteCat.id, response.breeds[0]);
    } catch (error: any) {
      throw error;
    }
  });

  return await Promise.all(promises);
};

const fetchCatsData = async () => {
  try {
    const req = {
      limit: 20,
      //limit: 5,
    };

    const data = await getCatsAPI(req);
    store.setCats(data);
  } catch (error: any) {
    throw error;
  }
};

const fetchUserData = async () => {
  try {
    const favouriteCats = await getFavouriteCatsAPI();
    store.setFavouriteCats(favouriteCats);
    await getFavouriteCatsBreeds(favouriteCats);
    const uploadedCats = await getUploadedCatsAPI({
      limit: 1000,
    });
    store.setUploadedCats(uploadedCats);
    await fetchCatsData();
  } catch (error: any) {
    throw error;
  }
};

export default fetchUserData;
