import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

type SaveUserApiKeysParams = {
  catApiKey: string;
  dogApiKey: string;
};

const saveUserApiKeys = async ({
  catApiKey,
  dogApiKey,
}: SaveUserApiKeysParams) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  const userRef = doc(db, "users", currentUser.uid);

  await setDoc(
    userRef,
    {
      catApiKey: catApiKey,
      dogApiKey: dogApiKey,
    },
    { merge: true },
  );

  return { catApiKey: catApiKey, dogApiKey: dogApiKey };
};

export default saveUserApiKeys;
