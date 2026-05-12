import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useStore from "../../store/store";

const store = useStore.getState();

interface DeleteAccountParams {
  password: string;
}

const deleteUserAccount = async (params: DeleteAccountParams) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error("User is not authenticated");
    }

    // Переаутентификация с паролем (обязательно для удаления аккаунта)
    const credential = EmailAuthProvider.credential(currentUser.email, params.password);

    await reauthenticateWithCredential(currentUser, credential);

    // Удаление пользователя из Firebase Auth
    await deleteUser(currentUser);
    store.showSuccessToast("Your account has been deleted");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    store.showErrorToast("Error deleting account: " + errorMessage);
    throw error;
  }
};

export default deleteUserAccount;
