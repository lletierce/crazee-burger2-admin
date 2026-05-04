import { browserLocalPersistence, confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

export const register = async (email: string, password: string) => {
  await setPersistence(auth, browserLocalPersistence);
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email: string, password: string) => {
  await setPersistence(auth, browserLocalPersistence);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
    // return await sendPasswordResetEmail(auth, email);
        return await sendPasswordResetEmail(auth, email, {url: "http://localhost:5173/login"}); 
}

export const confirmReset = async (code: string, newPassword: string) => {
  await confirmPasswordReset(auth, code, newPassword);
};

export const logout = async () => {
  return await signOut(auth);
};