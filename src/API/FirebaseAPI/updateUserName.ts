import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const updateUserName = async (newName: string) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    await updateProfile(currentUser, {
      displayName: newName,
    });

    return newName;
  } catch (error) {
    throw error;
  }
};

export default updateUserName;
