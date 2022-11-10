import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    console.log(adminList);
  }, [adminList]);

  async function signup(email, password, name) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    return await user
      .updateProfile({ displayName: name })
      .then((user) => user.notifyPath("user.displayName"));
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

  function isAdmin() {
    return adminList.some((uid) => currentUser.uid === uid);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // List of admin users
  useEffect(() => {
    const unsubscribe = onValue(ref(db, "/Admin"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setAdminList([]);
        Object.values(data).map((adminList) =>
          setAdminList((oldAdminList) => [...oldAdminList, adminList])
        );
      }
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
    isAdmin,
    adminList,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
