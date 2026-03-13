import { IUploadedCatsSlice } from "../constants/interfaces";
import { CatType } from "../constants/types";

export const createUploadedCatsSlice = (
  set: any,
  get: any,
  api: any,
): IUploadedCatsSlice => ({
  uploadedCats: [],
  setUploadedCats: (value: Array<CatType>) =>
    set({
      uploadedCats: value,
    }),
  addUploadedCat: (value: CatType) => {
    set((state: IUploadedCatsSlice) => ({
      uploadedCats: [value, ...state.uploadedCats],
    }));
  },
  addUploadedCats: (value: Array<CatType>) => {
    const currentUploadedCats = get().uploadedCats;
    currentUploadedCats.push(...value);
    set({
      uploadedCats: currentUploadedCats,
    });
  },
  deleteUploadedCat: (value: string) => {
    set((state: IUploadedCatsSlice) => ({
      uploadedCats: state.uploadedCats.filter((cat) => cat.id !== value),
    }));
  },
});
