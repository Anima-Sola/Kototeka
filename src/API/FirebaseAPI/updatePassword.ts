import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";

interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

const updateUserPassword = async (
  params: UpdatePasswordParams
): Promise<void> => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error("User is not authenticated");
    }

    // Переаутентификация с текущим паролем
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      params.currentPassword
    );

    await reauthenticateWithCredential(currentUser, credential);

    // Обновление пароля
    await updatePassword(currentUser, params.newPassword);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating password:", errorMessage);
    throw error;
  }
};

export default updateUserPassword;
