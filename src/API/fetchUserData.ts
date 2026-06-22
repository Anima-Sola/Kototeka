import useStore from "../store/store";
import getPetByIdAPI from "./getPetById";
import getPetsAPI from "./getPets";
import getFavouritePetsAPI from "./getFavouritePets";
import getUploadedPetsAPI from "./getUploadedPets";
import { favouritePetType } from "../constants/types";
import { MAX_NUMBER_OF_UPLOADED } from "../constants/common";

const store = useStore.getState();

const getFavouritePetsBreeds = async (favouritePets: favouritePetType[]) => {
  const promises = favouritePets.map(async (favouritePet) => {
    const response = await getPetByIdAPI(favouritePet.image.id);
    if (response.breeds)
      store.addFavoritePetBreeds(favouritePet.id, response.breeds[0]);
  });

  return await Promise.all(promises);
};

const fetchPetsData = async () => {
  const data = await getPetsAPI(store.filterRequestSettings);
  store.setPets(data);
};

const fetchUserData = async (userId: string) => {
  const favouritePets = await getFavouritePetsAPI(userId);
  store.setFavouritePets(favouritePets);
  await getFavouritePetsBreeds(favouritePets);
  const uploadedPets = await getUploadedPetsAPI(MAX_NUMBER_OF_UPLOADED, userId);
  store.setUploadedPets(uploadedPets);
  await fetchPetsData();
};

export default fetchUserData;
