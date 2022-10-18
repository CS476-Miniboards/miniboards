import React, {useEffect} from "react";
import { useGame } from "../Models/gameList/GameListContext"
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate()
  
  // const selected = gameList.firstWhere()
  
  useEffect(() => {
    if (currentGame == null) {
      navigate("/")
    }
  }, [currentGame, navigate])

  return isLoading? <></> : <><div>{currentGame?.Name}</div><div>{currentGame?.Description}</div></>
}
