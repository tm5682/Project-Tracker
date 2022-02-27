import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";

import {
  updateEmail,
  updatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState();

  async function signup(email, password) {

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setFirebaseError(error);
    }
  }

  async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setFirebaseError(error);
      }
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    firebaseError,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
