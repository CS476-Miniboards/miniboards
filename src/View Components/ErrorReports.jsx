import React from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../Models/auth/AuthContext";

export default function ErrorReports() {
  const { adminList } = useAuth();

  return (
    <Table striped bordered hover>
      <tbody>
        {Object.values(adminList).map((adminList, i) => {
          return (
            <tr key={i}>
              <td>{adminList}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
