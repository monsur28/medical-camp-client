/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firbase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const gitProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const gitHubSignIn = () => {
    return signInWithPopup(auth, gitProvider);
  };

  if (loading) {
    return (
      <span className="loading loading-bars flex justify-center items-center loading-lg"></span>
    );
  }

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    updateUserProfile,
    googleSignIn,
    gitHubSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
