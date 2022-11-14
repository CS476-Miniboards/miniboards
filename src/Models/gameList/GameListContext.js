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
        Object.values(data).map((gameList) =>
          setGameList((oldGameList) => [...oldGameList, gameList])
        );
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function selectGame(game) {
    setCurrentGame(game);
  }

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, "/games/" + currentGame?.ID),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setCurrentGame(data);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentGame?.ID]);

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

  useEffect(() => {
    const unsubscribe = onValue(ref(db, "/games"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDropdownList([]);
        Object.values(data).map((gameList) =>
          setDropdownList((oldGameList) => [...oldGameList, gameList?.Name])
        );
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
