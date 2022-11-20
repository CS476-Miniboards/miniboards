import React from "react";
import { Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";
import Container from "react-bootstrap/Container";

export default function AdminList() {
  const { adminList } = useAdmin();

  return (
    <Container>
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
    </Container>
  );
}
