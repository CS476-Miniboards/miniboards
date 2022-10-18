import React from "react";
import { NavDropdown } from "react-bootstrap";
import {useGame} from '../Models/gameList/GameListContext'

export default function GameList({type}) {

  const {gameList, isLoading} = useGame();

  return (
    isLoading ? <></> :
    Object.values(gameList).map((game, i)=>(
      <NavDropdown.Item link="/" key={i}>{game.Name}</NavDropdown.Item>
    ))
  );
}
