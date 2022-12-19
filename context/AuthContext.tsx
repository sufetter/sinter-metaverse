import React, {createContext, useState} from "react";
import {useEffect} from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import {auth} from "../firebaseconfig";

export const AuthContext = createContext({});

export const AuthContextProvider = ({children}: any) => {
  const [currentUser, setCurrentUser] = useState<object | string>({});

  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser("not user");
    }
  });

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
