import React, {useEffect} from "react";
import { useGame } from "../Models/gameList/GameListContext"
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

export default function Game() {
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate()
    
  useEffect(() => {
    if (currentGame == null) {
      navigate("/")
    }
  }, [currentGame,navigate])

  return (isLoading ? <></> :
    <>
      <div>{currentGame?.Name}</div>
      {currentGame ? <div>{parse(currentGame?.Embed)}</div> : <></>}
      <div>{currentGame?.Description}</div>
    </>)
}
