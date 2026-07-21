import { IApiSlice } from "../constants/interfaces";
import { CATS_BASE_URL, DOGS_BASE_URL } from "../constants/urls";
import { CATS_API_KEY, DOGS_API_KEY } from "../constants/api";

export const createApiSlice = (set: any, get: any, api: any): IApiSlice => ({
  petsType: "cats",
  apiKey: CATS_API_KEY,
  baseUrl: CATS_BASE_URL,
  setApi: (value) => {
    if (value === "cats") {
      set({
        petsType: value,
        apiKey: CATS_API_KEY,
        baseUrl: CATS_BASE_URL,
      });
    } else {
      set({
        petsType: value,
        apiKey: DOGS_API_KEY,
        baseUrl: DOGS_BASE_URL,
      });
    }
  },
});
