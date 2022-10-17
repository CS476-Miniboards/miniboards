import { onValue, ref } from "firebase/database";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";

const GameListContext = React.createContext();

export function useGame() {
  return useContext(GameListContext);
}

export function GameListProvider({ children }) {
  const [currentGame, setCurrentGame] = useState();
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "/games"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setGameList([]);
        Object.values(data).map((gameList) => {
          setGameList((oldGameList) => [...oldGameList, gameList]);
        });
      }
      setLoading(false);
    });

    console.log(gameList);
    return unsubscribe;
  }, []);

  const value = {
    currentGame,
    gameList,
  };

  return (
    <GameListContext.Provider value={value}>
      {!loading && children}
    </GameListContext.Provider>
  );
}
