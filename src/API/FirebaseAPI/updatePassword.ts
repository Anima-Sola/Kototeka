import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useStore from "../../store/store";

const store = useStore.getState();

interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

const updateUserPassword = async (params: UpdatePasswordParams) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error("User is not authenticated");
    }

    // Переаутентификация с текущим паролем
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      params.currentPassword,
    );

    await reauthenticateWithCredential(currentUser, credential);

    // Обновление пароля
    await updatePassword(currentUser, params.newPassword);
    store.showSuccessToast("Your password has been changed successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    store.showErrorToast("Error updating password: " + errorMessage);
    throw error;
  }
};

export default updateUserPassword;
