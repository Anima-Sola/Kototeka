import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const updateUserName = async (newName: string): Promise<string> => {
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
    //TO DO - тост об ошибке
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating user name:", errorMessage);
    throw error;
  }
};

export default updateUserName;
