import { IUploadedPetsSlice } from "../constants/interfaces";
import { PetType } from "../constants/types";

export const createUploadedPetsSlice = (
  set: any,
  get: any,
  api: any,
): IUploadedPetsSlice => ({
  uploadedPets: [],
  setUploadedPets: (value: Array<PetType>) =>
    set({
      uploadedPets: value,
    }),
  addUploadedPet: (value: PetType) => {
    set((state: IUploadedPetsSlice) => ({
      uploadedPets: [value, ...state.uploadedPets],
    }));
  },
  deleteUploadedPet: (value: string) => {
    set((state: IUploadedPetsSlice) => ({
      uploadedPets: state.uploadedPets.filter((pet) => pet.id !== value),
    }));
  },
});
