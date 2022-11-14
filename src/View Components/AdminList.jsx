import React from "react";
import { Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";

export default function AdminList() {
  const { adminList } = useAdmin();

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
