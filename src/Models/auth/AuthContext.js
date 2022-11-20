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
    setDisplayName(name);
    return await user.updateProfile({ displayName: name });
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

  function updateDisplayName(name) {
    setDisplayName(name);
    return currentUser.updateProfile({ displayName: name });
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

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
    displayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
