import { onValue, ref, child, push, remove, set } from "firebase/database";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../auth/AuthContext";

const GameListContext = React.createContext();

export function useGame() {
  return useContext(GameListContext);
}

export function GameListProvider({ children }) {
  const [currentGame, setCurrentGame] = useState();
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownList, setDropdownList] = useState([]);

  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(currentUser?.displayName);
  }, [currentUser?.displayName]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "/games"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setGameList([]);
        setDropdownList([]);
        Object.values(data).map((gameList) => {
          setGameList((oldGameList) => [...oldGameList, gameList]);
          setDropdownList((oldGameList) => [...oldGameList, gameList?.Name]);
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function selectGame(game) {
    setCurrentGame(game);
  }

  function saveScore(score) {
    var id = currentGame.ID;
    var newScoreRef = push(child(ref(db), `/games/${id}/scores`));

    set(newScoreRef, {
      displayName,
      score,
      id: newScoreRef.key,
    });
  }

  function deleteScore(gameId, scoreId) {
    remove(ref(db, `/games/${gameId}/scores/${scoreId}`));
  }

  const value = {
    currentGame,
    gameList,
    selectGame,
    saveScore,
    deleteScore,
    dropdownList,
  };

  return (
    <GameListContext.Provider value={value}>
      {!loading && children}
    </GameListContext.Provider>
  );
}
