import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";
import { useGame } from "../Models/gameList/GameListContext";
import { useApp } from "../Models/AppContext";

export default function RealtimeData({ game }) {
  const [sortedScores, setSortedScores] = useState([]);
  const { register } = useApp();
  const { isAdmin } = useAdmin();
  const { deleteScore } = useGame();

  useEffect(() => {
    register(this, "<GameListProvider>");
    register(this, "<AdminProvider>");
    // eslint-disable-next-line
  }, []);

  //TODO: Move to useGame
  // Keep highscore table updated and sorted in real-time
  useEffect(() => {
    if (game?.scores) {
      setSortedScores([]);
      Object.values(game?.scores).map((scores) =>
        setSortedScores((oldScores) =>
          [...oldScores, scores].sort((a, b) => b.score - a.score).slice(0, 10)
        )
      );
    }
  }, [game?.scores]);

  return game?.scores ? (
    <>
      <h1>{game?.Name}</h1>
      <Table striped borderless size="sm" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(sortedScores).map((row, index) => {
            return (
              <tr key={index}>
                <td>{row?.displayName}</td>
                <td>{row?.score}</td>
                {isAdmin() && (
                  <td>
                    <button
                      key={index}
                      onClick={() => deleteScore(game?.ID, row?.id)}
                    >
                      Delete Score
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  ) : (
    <>
      No scores have been submitted for this game yet! Play the game, own the
      leaderboards!
    </>
  );
}
