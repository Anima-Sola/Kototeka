import { FirebaseError } from "firebase/app";

export const getApiErrorMessage = (
  error: any,
  customMessage: string = "",
): string => {
  let message = error.message;

  if (error.type === "http") {
    if (customMessage) return customMessage;

    switch (error.status) {
      case 400:
        if (error.message.indexOf("Classifcation failed") !== -1)
          message = "Classifcation failed: correct pet not found.";
        else if (error.message.indexOf("Monthly upload quota reached") !== -1)
          message = "Monthly upload quota reached (15).";
        else message = "Error while receiving data.";
        break;
      case 401:
        message = "The user is not authorized.";
        break;
      case 429:
        message = "Too many requests to the server. Try again later.";
        break;
      default:
        message = "Error while receiving data.";
    }
  }

  return message;
};

export const getFirebaseApiErrorMessage = (error: FirebaseError): string => {
  let message = error.message;

  switch (error.code) {
    case "auth/invalid-credential":
      message = "Incorrect email address or/and password";
      break;
    case "auth/too-many-requests":
      message = "Too many login attempts. Please try again later.";
      break;
    case "auth/network-request-failed":
      message = "Network error. Please check your internet connection.";
      break;
    case "auth/email-already-in-use":
      message = "A user with this email address is already registered.";
      break;
    default:
      message = `Firebase error: ${error.code} ${error.message}`;
  }

  return message;
};
