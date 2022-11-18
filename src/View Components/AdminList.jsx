import React from "react";
import { Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";

export default function AdminList() {
  const { adminList } = useAdmin();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Admin Name</th>
          <th>UUID</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(adminList).map((adminList, i) => {
          return (
            <tr key={i}>
              <td>{adminList[0]}</td>
              <td>{adminList[1]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
