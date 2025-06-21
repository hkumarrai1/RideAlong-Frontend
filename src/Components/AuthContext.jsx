import { useState, useEffect, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "./firebase";
import axiosInstance from "./axiosInstance";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert(
        "Verification email sent! Please check your inbox and spam folder."
      );
      const uid = user.uid;
      await axiosInstance.post("/api/user/register", {
        firebaseUID: uid,
        email: user.email,
      });
      return userCredential;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return null;
      }

      return user;
    } catch (error) {
      return { error: error.message };
    }
  }
  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {}
  }
  async function facebookLogin() {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
    } catch (error) {}
  }
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  async function logout() {
    return signOut(auth);
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        login,
        googleLogin,
        facebookLogin,
        resetPassword,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
