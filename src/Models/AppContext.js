import { AuthProvider } from "./auth/AuthContext";
import { GameListProvider } from "./gameList/GameListContext";
import { AdminProvider } from "./admin/AdminContext";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [observerList, setObserverList] = useState([{}]);

  useEffect(() => {
    for (var pair in observerList) {
      <AppContext.Consumer>
        {pair.provider}
        {pair.observer}
      </AppContext.Consumer>;
    }
  }, [observerList]);

  function register(observer, provider) {
    setObserverList(...observerList, { observer, provider });
  }

  function unregister(observer, provider) {
    var list = [...observerList];
    var object = { observer, provider };
    var index = list.indexOf(object);
    if (index !== -1) {
      list.splice(index, 1);
      setObserverList(list);
    }
  }

  const value = {
    register,
    unregister,
  };

  return (
    <AppContext.Provider value={value}>
      <AuthProvider>
        <AdminProvider>
          <GameListProvider>{children}</GameListProvider>
        </AdminProvider>
      </AuthProvider>
    </AppContext.Provider>
  );
}
