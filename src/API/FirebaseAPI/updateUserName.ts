import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useStore from "../../store/store";

const store = useStore.getState();

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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    store.showErrorToast("Error updating user name: " + errorMessage);
  }
};

export default updateUserName;
