import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useAdmin } from "../Models/admin/AdminContext";
import { useApp } from "../Models/AppContext";

export default function ErrorReports() {
  const { register } = useApp();
  const { errorList } = useAdmin();
  useEffect(() => {
    register(this, "<AdminProvider>");
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Problem Source</th>
            <th>Error Report</th>
            <th>Reported Time</th>
            <th>Report By</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(errorList)
            .map((errorList, i) => {
              var date = new Date(errorList?.Time).toLocaleString();
              return (
                <tr key={i}>
                  <td>{errorList?.ErrorSource}</td>
                  <td>{errorList?.Report}</td>
                  <td>{date}</td>
                  <td>{errorList?.Email}</td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </Table>
    </Container>
  );
}
