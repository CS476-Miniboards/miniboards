import React, { useEffect, useState } from "react";
import { useGame } from "../Models/gameList/GameListContext";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

export default function Game() {
  const { isLoading, currentGame, saveScore } = useGame();
  const navigate = useNavigate();

  const [currentScore, setCurrentScore] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (currentGame == null) {
      navigate("/");
    }
  }, [currentGame, navigate]);

  useEffect(() => {
    const handleEvent = (event) => {
      if (event?.data?.stateKey === "S/Score") {
        const encodedData = base64ToHexFunc(event.data.stateValue);
        setCurrentScore(parseInt(encodedData, "16"));
      }

      if (event?.data?.stateKey === "S/GameOver") {
        var isTrue = base64ToHexFunc(event.data.stateValue).toString() === "01";

        if (isTrue) {
          setGameOver(true);
        } else {
          setGameOver(false);
        }
      }
    };

    const base64ToHexFunc = (str) => {
      const encodedData = atob(str);
      let result = "";
      for (let i = 0; i < encodedData.length; i++) {
        const hex = encodedData.charCodeAt(i).toString(16);
        result += hex.length === 2 ? hex : "0" + hex;
      }
      return result;
    };

    window.addEventListener("message", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      saveScore(currentScore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  return isLoading ? (
    <></>
  ) : (
    <>
      <div>
        {currentGame?.Name} Score: {currentScore}
      </div>
      {currentGame ? <div>{parse(currentGame?.Embed)}</div> : <></>}
      <div>{currentGame?.Description}</div>
    </>
  );
}
