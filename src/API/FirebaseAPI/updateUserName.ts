import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const updateUserName = async (newName: string) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  await updateProfile(currentUser, {
    displayName: newName,
  });

  return newName;
};

export default updateUserName;
