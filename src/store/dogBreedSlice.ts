import { IDogBreedsSlice } from "../constants/interfaces";
import { BreedTypeFromBack, BreedType } from "../constants/types";

export const createDogBreedsSlice = (
  set: any,
  get: any,
  api: any,
): IDogBreedsSlice => ({
  dogBreeds: {},
  selectedDogBreeds: {},
  setDogBreeds: (breeds: BreedTypeFromBack[]) => {
    const breedsObject: Record<string, BreedType> = {};

    breeds.forEach((breed) => {
      breedsObject[breed.id] = {
        name: breed.name,
      };
    });

    set({
      dogBreeds: breedsObject,
      selectedDogBreeds: {},
    });
  },
  toggleDogBreed: (breedId) => {
    set((state: IDogBreedsSlice) => ({
      selectedDogBreeds: {
        ...state.selectedDogBreeds,
        [breedId]: !state.selectedDogBreeds[breedId],
      },
    }));
  },
  clearSelectedDogBreeds: () => {
    set({
      selectedDogBreeds: {},
    });
  },
  selectAllDogBreeds: () => {
    set((state: IDogBreedsSlice) => {
      const selectedDogBreeds: Record<string, boolean> = {};

      Object.keys(state.dogBreeds).forEach((breedId) => {
        selectedDogBreeds[breedId] = true;
      });

      return {
        selectedDogBreeds,
      };
    });
  },
});