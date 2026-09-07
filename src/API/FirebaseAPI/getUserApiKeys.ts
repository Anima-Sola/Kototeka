import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const getUserApiKeys = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return {
      catApiKey: "",
      dogApiKey: "",
    };
  }

  const data = userSnap.data();

  return {
    catApiKey: typeof data?.catApiKey === "string" ? data.catApiKey : "",
    dogApiKey: typeof data?.dogApiKey === "string" ? data.dogApiKey : "",
  };
};

export default getUserApiKeys;
