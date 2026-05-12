import { IToastSlice } from "../constants/interfaces";

export const createToastSlice = (set: any, get: any, api: any): IToastSlice => ({
  isSuccessToastVisible: false,
  isErrorToastVisible: false,
  toastMessage: "",
  showSuccessToast: (message: string) => {
    set({ isSuccessToastVisible: true, toastMessage: message });
    setTimeout(() => set({ isSuccessToastVisible: false, toastMessage: "" }), 3000);
  },
  showErrorToast: (message: string) => {
    set({ isErrorToastVisible: true, toastMessage: message });
    setTimeout(() => set({ isErrorToastVisible: false, toastMessage: "" }), 3000);
  },
});
