import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../Models/auth/AuthContext";
import { useGame } from "../Models/gameList/GameListContext";

export default function RealtimeData({ game }) {
  const [sortedScores, setSortedScores] = useState([]);
  const { isAdmin } = useAuth();
  const { deleteScore } = useGame();

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
    <Table borderless>
      <thead>
        <tr>
          <td>{game?.Name}</td>
        </tr>
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
  ) : (
    <>
      No scores have been submitted for this game yet! Play the game, own the
      leaderboards!
    </>
  );
}
