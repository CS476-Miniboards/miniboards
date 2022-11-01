import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function RealtimeData({ game }) {
  const [sortedScores, setSortedScores] = useState([]);

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
    <Table>
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
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <></>
  );
}
