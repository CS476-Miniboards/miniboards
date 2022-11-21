import React, { useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useGame } from "../Models/gameList/GameListContext";
import { useApp } from "../Models/AppContext";
import { Link } from "react-router-dom";

export default function GameList({ type }) {
  const { register } = useApp();
  const { gameList, isLoading, selectGame } = useGame();

  useEffect(() => {
    register(this, "<GameListProvider>");
    // eslint-disable-next-line
  }, []);

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
        active={false}
      >
        {game.Name}
      </NavDropdown.Item>
    ))
  );
}
