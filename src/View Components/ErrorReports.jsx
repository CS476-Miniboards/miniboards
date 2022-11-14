import React from "react";
import { Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";

export default function ErrorReports() {
  const { errorList } = useAdmin();
  return (
    <Table striped bordered hover>
      <tbody>
        {Object.values(errorList).map((errorList, i) => {
          return (
            <tr key={i}>
              <td>{errorList}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
