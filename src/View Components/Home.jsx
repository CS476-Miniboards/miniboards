import React, { useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGame } from "../Models/gameList/GameListContext";
import { useApp } from "../Models/AppContext";

export default function Home() {
  const { register } = useApp();
  const { gameList, selectGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    register(this, "<GameListProvider>");
    // eslint-disable-next-line
  }, []);

  function handleOnClick(game) {
    selectGame(game);
    navigate("/game");
  }

  return (
    <>
      <Row
        className="cards"
        xs={1}
        sm={2}
        md={3}
        lg={4}
        style={{ margin: "8px" }}
      >
        {Object.values(gameList).map((game, index) => {
          return (
            <Card
              className="game-card"
              key={index}
              style={{
                width: "18rem",
                margin: "8px auto",
                padding: "0px",
              }}
              onClick={() => handleOnClick(game)}
            >
              <Card.Img variant="top" src={game.ImageURL} />
              <Card.Body>
                <Card.Title>{game.Name}</Card.Title>
                <Card.Text>{game.Description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
      <div className="keyboard-controls">
        Keyboard Controls: WASD or Arrow Keys - Z X SPACE or ENTER{" "}
      </div>
    </>
  );
}
