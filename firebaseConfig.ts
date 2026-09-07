import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3vE1QxUV5B3_CVipvuHbWw2M4kHRCr8Y",
  authDomain: "kototeka-f958e.firebaseapp.com",
  projectId: "kototeka-f958e",
  storageBucket: "kototeka-f958e.firebasestorage.app",
  messagingSenderId: "14279691744",
  appId: "1:14279691744:android:84846178bba7f2a31c2f85",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default auth;
