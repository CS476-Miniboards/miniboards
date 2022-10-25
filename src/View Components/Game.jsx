import React, {useEffect, useState} from "react";
import { useGame } from "../Models/gameList/GameListContext"
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import parse from 'html-react-parser';

export default function Game() {
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate()

  const [currentScore, setCurrentScore] = useState("")
  const [gameOver, setGameOver] = useState(false)
  
  useEffect(() => {
    if (currentGame == null) {
      navigate("/")
    }
  }, [currentGame,navigate])


  window.addEventListener("message", (event)=> {
    if(event?.data?.stateKey === "S/Score") {
      const encodedData = base64ToHexFunc(event.data.stateValue)
      setCurrentScore(parseInt(encodedData,'16'))
      }

      if(event?.data?.stateKey === "S/GameOver") {
        var value = base64ToHexFunc(event.data.stateValue).toString()
        if (value == true) {
          setGameOver(true)
        }
        if (value == false) {
          setGameOver(false)
        }
        }
  })

  function base64ToHexFunc(str) {
    const encodedData = atob(str)
    let result = '';
    for (let i = 0; i < encodedData.length; i++) {
      const hex = encodedData.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result;
  }

  // window.addEventListener("StorageEvent",(event)=>{console.log(event)})

  return (isLoading ? <></> :
    <>
      <div>{currentGame?.Name}  Score: {currentScore}</div>
      {currentGame ? <div>{parse(currentGame?.Embed)}</div> : <></>}
      <div>{currentGame?.Description}</div>
    </>)
}
