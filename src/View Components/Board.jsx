import React, { useEffect } from "react";
import { useGame } from "../Models/gameList/GameListContext"
import { useNavigate } from "react-router-dom";
import RealtimeData from "./RealtimeData"

export default function Board() {
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (currentGame == null) {
      navigate("/")
    }
  }, [currentGame, navigate])
  

  return isLoading? <></> : <RealtimeData game={currentGame}/>;
}
