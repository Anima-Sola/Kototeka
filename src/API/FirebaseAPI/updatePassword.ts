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

const updateUserPassword = async (params: UpdatePasswordParams) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      throw new Error("User is not authenticated");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      params.currentPassword,
    );
    await reauthenticateWithCredential(currentUser, credential);

    await updatePassword(currentUser, params.newPassword);
  } catch (error) {
    throw error;
  }
};

export default updateUserPassword;
