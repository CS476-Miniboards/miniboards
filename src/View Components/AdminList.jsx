import React from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../Models/auth/AuthContext";

export default function AdminList() {
  const { adminList } = useAuth();

  return (
    <Table striped bordered hover>
      <tbody>
        {Object.values(adminList).map((adminList, i) => {
          return (
            <tr>
              <td key={i}>{adminList}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
