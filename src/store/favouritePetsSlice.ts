import { IFavouritePetsSlice } from "../constants/interfaces";
import { favouritePetType } from "../constants/types";

export const createFavouritePetsSlice = (
  set: any,
  get: any,
  api: any
): IFavouritePetsSlice => ({
  favouritePets: [],
  setFavouritePets: (value: Array<favouritePetType>) =>
    set({
      favouritePets: value,
    }),
  addFavouritePet: (value: favouritePetType) => {
    set((state: IFavouritePetsSlice) => ({
      favouritePets: [value, ...state.favouritePets],
    }));
  },
  deleteFavouritePet: (value: string) => {
    set((state: IFavouritePetsSlice) => ({
      favouritePets: state.favouritePets.filter((pet) => pet.id !== value),
    }));
  },
  addFavoritePetBreeds: (id: string, breeds: any) => {
    set((state: IFavouritePetsSlice) => ({
      favouritePets: state.favouritePets.map((pet) =>
        pet.id === id ? { ...pet, breeds } : pet
      ),
    }));
  },
});
