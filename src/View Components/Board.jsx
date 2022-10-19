import React, { useEffect } from "react";
import { useGame } from "../Models/gameList/GameListContext"
import { useNavigate } from "react-router-dom";

export default function Board() {
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (currentGame == null) {
      navigate("/")
    }
  }, [currentGame, navigate])
  
// <RealtimeData/> displays the leaderboard to the page
  return isLoading? <></> : <RealtimeData/>;
}
