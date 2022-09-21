import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbdm74GqKvopa0-T7BPBaN-1yTW9F2Xoo",
  authDomain: "show-me-the-cash.firebaseapp.com",
  projectId: "show-me-the-cash",
  storageBucket: "show-me-the-cash.appspot.com",
  messagingSenderId: "1087403677008",
  appId: "1:1087403677008:web:3828ae4d8ca4ab20688855",
  measurementId: "G-2ZKSSLV4F8",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
