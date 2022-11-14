import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { useAuth } from "../auth/AuthContext";

const AdminContext = React.createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const [adminList, setAdminList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  const { currentUser } = useAuth();

  // Compares current ID to the database containing admin id's
  function isAdmin() {
    return adminList.some((uid) => currentUser?.uid === uid);
  }

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

  // List of reported errors
  useEffect(() => {
    const unsubscribe = onValue(ref(db, "/errors"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setErrorList([]);
        Object.values(data).map((errorList) =>
          setErrorList((oldErrorList) => [...oldErrorList, errorList])
        );
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    isAdmin,
    adminList,
    errorList,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
