import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

const UserContext = createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    await setDoc(doc(db, "users", uid), {
      name,
      email: res.user.email,
      watchList: [],
      createdAt: Date.now(),
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const uid = res.user.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: res.user.email,
        watchList: [],
        createdAt: Date.now(),
      });
    }
  };

  const signInWithGithub = async () => {
    const res = await signInWithPopup(auth, githubProvider);
    const uid = res.user.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: res.user.email,
        watchList: [],
        createdAt: Date.now(),
      });
    }
  };

  const signInWithFacebook = async () => {
    const res = await signInWithPopup(auth, facebookProvider);
    const uid = res.user.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: res.user.email,
        watchList: [],
        createdAt: Date.now(),
      });
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser({ ...currentUser, ...userSnap.data() });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ signUp, signIn, logout, resetPassword, signInWithGoogle, signInWithGithub, signInWithFacebook, user, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
