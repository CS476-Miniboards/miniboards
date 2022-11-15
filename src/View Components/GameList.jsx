import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useGame } from "../Models/gameList/GameListContext";
import { Link } from "react-router-dom";

export default function GameList({ type }) {
  const { gameList, isLoading, selectGame } = useGame();

  function handleClick(game) {
    selectGame(game);
  }

  return isLoading ? (
    <></>
  ) : (
    Object.values(gameList).map((game, i) => (
      <NavDropdown.Item
        eventKey={i}
        as={Link}
        to={type}
        key={i}
        onClick={() => handleClick(game)}
      >
        {game.Name}
      </NavDropdown.Item>
    ))
  );
}
