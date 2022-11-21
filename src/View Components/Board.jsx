import React, { useEffect } from "react";
import { useGame } from "../Models/gameList/GameListContext";
import { useNavigate } from "react-router-dom";
import RealtimeData from "./RealtimeData";
import Container from "react-bootstrap/Container";
import { useApp } from "../Models/AppContext";

export default function Board() {
  const { register } = useApp();
  const { isLoading, currentGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentGame == null) {
      navigate("/");
    }
  }, [currentGame, navigate]);

  useEffect(() => {
    register(this, "<GameListProvider>");
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <Container>
      <RealtimeData game={currentGame} />
    </Container>
  );
}
