import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const deleteUserAccount = async (currentPassword: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser || !currentUser.email) {
    throw new Error("User is not authenticated");
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    currentPassword,
  );
  await reauthenticateWithCredential(currentUser, credential);

  await deleteUser(currentUser);
};

export default deleteUserAccount;
