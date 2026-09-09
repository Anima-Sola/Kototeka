import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import auth from "../../../firebaseConfig";
import { getGoogleCredential } from "./signInWithGoogle";

const deleteFirestoreUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};

const deleteUserAccount = async (currentPassword?: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  const providerIds = currentUser.providerData.map(
    (provider) => provider.providerId,
  );

  // Email / Password
  if (providerIds.includes("password")) {
    if (!currentUser.email) {
      throw new Error("User email is not available");
    }

    if (!currentPassword) {
      throw new Error("Password is required");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword,
    );

    await reauthenticateWithCredential(currentUser, credential);
  }

  // Google
  else if (providerIds.includes("google.com")) {
    const credential = await getGoogleCredential();

    await reauthenticateWithCredential(currentUser, credential);
  } else {
    throw new Error("Unsupported authentication provider");
  }

  // Удаляем данные пользователя из Firestore
  await deleteFirestoreUserData(currentUser.uid);

  // Удаляем Firebase Authentication account
  await deleteUser(currentUser);
};

export default deleteUserAccount;

/*import {
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

export default deleteUserAccount;*/
