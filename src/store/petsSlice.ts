import { IPetsSlice } from "../constants/interfaces";
import { PetType } from "../constants/types";
import { DEFAULT_LIMIT_PHOTOS } from "../constants/common";

export const createPetsSlice = (set: any, get: any, api: any): IPetsSlice => ({
  pets: [],
  filterRequestSettings: {
    limit: DEFAULT_LIMIT_PHOTOS,
    has_breeds: false,
    breed_ids: "",
    mode: "allPhotos",
  },
  tempFilterRequestSettings: {
    limit: DEFAULT_LIMIT_PHOTOS,
    has_breeds: false,
    breed_ids: "",
    mode: "allPhotos",
  },
  isFiltersChanged: false,
  isApiChanged: false,
  setPets: (value: Array<PetType>) =>
    set({
      pets: value,
    }),
  addPets: (value: Array<PetType>) => {
    const currentPets = get().pets;
    currentPets.push(...value);
    set({
      pets: currentPets,
    });
  },
  setFilterRequestSettings: (value) =>
    set({
      filterRequestSettings: value,
    }),
  setTempFilterRequestSettings: (value) =>
    set({
      tempFilterRequestSettings: value,
    }),
  setIsFiltersChanged: (value: boolean) =>
    set({
      isFiltersChanged: value,
    }),
  setIsApiChanged: (value: boolean) =>
    set({
      isApiChanged: value,
    }),
});
