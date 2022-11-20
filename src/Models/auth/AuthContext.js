import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");

  async function signup(email, password, name) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    return await user
      .updateProfile({ displayName: name })
      .then((user) => setDisplayName(user.displayName));
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function forceUpdateUser() {
    console.log("Force Update");
    return auth.currentUser.getIdToken();
  }

  // Update current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setDisplayName(user?.displayName);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // // Update current user
  // useEffect(() => {
  //   const unsubscribe = auth?.userChanges().listen((user) => {
  //     console.log(user);
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    forceUpdateUser,
    displayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
