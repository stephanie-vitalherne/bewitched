import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "../data/key";
import { auth } from "../data/firebase";

const AuthContext = createContext({});
const config = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),

    []
  );

  const logout = () => {
    setLoadingState(true);
    signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoadingState(false));
  };

  const signInWithGoogle = async () => {
    setLoadingState(true);

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          //login
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((err) => setError(err))
      .finally(() => setLoadingState(false));
  };

  const memoValue = useMemo(
    () => ({
      user,
      loadingState,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loadingState, error]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
