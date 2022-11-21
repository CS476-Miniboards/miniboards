import { AuthProvider } from "./auth/AuthContext";
import { GameListProvider } from "./gameList/GameListContext";
import { AdminProvider } from "./admin/AdminContext";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [observerList, setObserverList] = useState([]);

  useEffect(() => {
    console.log("Observerlist", observerList);
    for (var pair in observerList) {
      <AppContext.Consumer>
        {pair.provider}
        {pair.observer}
      </AppContext.Consumer>;
    }
  }, [observerList]);

  function register(observer, provider) {
    var object = { observer, provider };
    var index = objectIndex(object);
    console.log(index);
    if (index === -1) {
      setObserverList([...observerList, object]);
    }
  }

  function unregister(observer, provider) {
    var list = [...observerList];
    var object = { observer, provider };
    var index = objectIndex(object);
    if (index !== -1) {
      list.splice(index, 1);
      setObserverList(list);
    }
  }

  function objectIndex(object) {
    var list = [...observerList];
    // eslint-disable-next-line
    list.find((o, i) => {
      if (Object.entries(o).toString() === Object.entries(object).toString()) {
        return i;
      }
    });
    return -1;
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
