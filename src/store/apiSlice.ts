import { IApiSlice } from "../constants/interfaces";

const CATS_API_KEY =
  "live_IvPY1SEgkw5n5dGvsNFeFKyy0vqejrhKUDO0r6BZVYUPEbKi0WbGnu2iOQX6qNsd";

const DOGS_API_KEY =
  "live_fs8aD7icmENZYqKVbpReT1JeeOc4q0mM04KFaW2cYcdP847OEhzM1IkbYYe99HOj";

const CATS_BASE_URL = "https://api.thecatapi.com";

const DOGS_BASE_URL = "https://api.thedogapi.com";

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
