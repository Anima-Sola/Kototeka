import {
  GoogleOneTapSignIn,
  isCancelledResponse,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
} from "react-native-nitro-google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import auth from "../../../firebaseConfig";

export function configureGoogleSignIn() {
  GoogleOneTapSignIn.configure({
    webClientId:
      "14279691744-2c83dpbbdm7ecshtb78c351to7lvpr25.apps.googleusercontent.com",
  });
}

export async function getGoogleCredential() {
  await GoogleOneTapSignIn.checkPlayServices();

  let response = await GoogleOneTapSignIn.signIn();

  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.createAccount();
  }

  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.presentExplicitSignIn();
  }

  if (!isSuccessResponse(response)) {
    if (isCancelledResponse(response)) {
      throw new Error("Google Sign-In was cancelled");
    }

    throw new Error(`Google Sign-In failed: ${response.type}`);
  }

  const { idToken } = response.data;

  if (!idToken) {
    throw new Error("Google ID token is missing");
  }

  return GoogleAuthProvider.credential(idToken);
}

export async function signInWithGoogle() {
  const credential = await getGoogleCredential();

  const result = await signInWithCredential(auth, credential);

  return result.user;
}

/*import {
  GoogleOneTapSignIn,
  isCancelledResponse,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
} from "react-native-nitro-google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import auth from "../../../firebaseConfig";

export function configureGoogleSignIn() {
  GoogleOneTapSignIn.configure({
    webClientId:
      "14279691744-2c83dpbbdm7ecshtb78c351to7lvpr25.apps.googleusercontent.com",
  });
}

export async function signInWithGoogle() {
  await GoogleOneTapSignIn.checkPlayServices();

  let response = await GoogleOneTapSignIn.signIn();

  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.createAccount();
  }

  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.presentExplicitSignIn();
  }

  if (!isSuccessResponse(response)) {
    if (isCancelledResponse(response)) {
      throw new Error("Google Sign-In was cancelled");
    }

    throw new Error(`Google Sign-In failed: ${response.type}`);
  }

  const { idToken } = response.data;

  if (!idToken) {
    throw new Error("Google ID token is missing");
  }

  const credential = GoogleAuthProvider.credential(idToken);

  const result = await signInWithCredential(auth, credential);

  return result.user;
}*/
