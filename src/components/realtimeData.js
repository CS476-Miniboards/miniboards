import React from "react";
import { Table } from "react-bootstrap";

export default function RealtimeData({ game }) {
  return game?.scores ? (
    <Table>
      <thead>
        <tr>{game?.Name}</tr>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(game?.scores).map((row, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row?.score}</td>
              <td>{row?.username}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <></>
  );
}
