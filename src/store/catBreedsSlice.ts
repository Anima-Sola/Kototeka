import { ICatBreedsSlice } from "../constants/interfaces";
import { BreedTypeFromBack, BreedType } from "../constants/types";

export const createCatBreedsSlice = (
  set: any,
  get: any,
  api: any,
): ICatBreedsSlice => ({
  catBreeds: {},
  selectedCatBreeds: {},
  setCatBreeds: (breeds: BreedTypeFromBack[]) => {
    const breedsObject: Record<string, BreedType> = {};

    breeds.forEach((breed) => {
      breedsObject[breed.id] = {
        name: breed.name,
      };
    });

    set({
      catBreeds: breedsObject,
      selectedCatBreeds: {},
    });
  },
  toggleCatBreed: (breedId) => {
    set((state: ICatBreedsSlice) => ({
      selectedCatBreeds: {
        ...state.selectedCatBreeds,
        [breedId]: !state.selectedCatBreeds[breedId],
      },
    }));
  },
  clearSelectedCatBreeds: () => {
    set({
      selectedCatBreeds: {},
    });
  },
  selectAllCatBreeds: () => {
    set((state: ICatBreedsSlice) => {
      const selectedCatBreeds: Record<string, boolean> = {};

      Object.keys(state.catBreeds).forEach((breedId) => {
        selectedCatBreeds[breedId] = true;
      });

      return {
        selectedCatBreeds,
      };
    });
  },
});
