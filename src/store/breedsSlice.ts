import { IBreedsSlice } from "../constants/interfaces";
import { BreedTypeFromBack, BreedType } from "../constants/types";

export const createBreedsSlice = (
  set: any,
  get: any,
  api: any,
): IBreedsSlice => ({
  breeds: {},
  selectedBreeds: {},
  setBreeds: (breeds: BreedTypeFromBack[]) => {
    const breedsObject: Record<string, BreedType> = {};

    breeds.forEach((breed) => {
      breedsObject[breed.id] = {
        name: breed.name,
      };
    });

    set({
      breeds: breedsObject,
      selectedBreeds: {},
    });
  },
  toggleBreed: (breedId) => {
    set((state: IBreedsSlice) => ({
      selectedBreeds: {
        ...state.selectedBreeds,
        [breedId]: !state.selectedBreeds[breedId],
      },
    }));
  },
  clearSelectedBreeds: () => {
    set({
      selectedBreeds: {},
    });
  },
  selectAllBreeds: () => {
    set((state: IBreedsSlice) => {
      const selectedBreeds: Record<string, boolean> = {};

      Object.keys(state.breeds).forEach((breedId) => {
        selectedBreeds[breedId] = true;
      });

      return {
        selectedBreeds,
      };
    });
  },
});
