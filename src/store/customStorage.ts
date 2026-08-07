import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { type PersistStorage } from "zustand/middleware";
import { StoreState } from "../constants/types";

const secureStorageKey = "pawslove-storage-api";

export const customStorage: PersistStorage<StoreState> = {
  getItem: async (name: string) => {
    const asyncValue = await AsyncStorage.getItem(name);
    const secureValue = await SecureStore.getItemAsync(secureStorageKey);

    if (!asyncValue && !secureValue) {
      return null;
    }

    const asyncState = asyncValue ? JSON.parse(asyncValue) : {};
    const secureState = secureValue ? JSON.parse(secureValue) : {};

    return {
      state: {
        ...asyncState,
        ...secureState,
      },
    };
  },

  setItem: async (name: string, storage) => {
    const state = storage.state ? storage.state : (storage as any);
    const secureValues = ["apiKey", "userCatApiKey", "userDogApiKey"];
    const excludedValues = ["isAppReady", "isOnboarding", "isHydrated"];
    const secureState: Record<string, unknown> = {};
    const asyncState: Record<string, unknown> = {};

    for (const key in state) {
      if (excludedValues.includes(key) || typeof state[key] === "function")
        continue;

      if (secureValues.includes(key)) {
        secureState[key] = state[key];
      } else {
        asyncState[key] = state[key];
      }
    }

    await AsyncStorage.setItem(name, JSON.stringify(asyncState));
    await SecureStore.setItemAsync(
      secureStorageKey,
      JSON.stringify(secureState),
    );
  },

  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
    await SecureStore.deleteItemAsync(secureStorageKey);
  },
};
